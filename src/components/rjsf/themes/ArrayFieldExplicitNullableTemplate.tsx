import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils"
import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react"
import MdiCheckboxBlankCircleOutline from "~icons/mdi/checkbox-blank-circle-outline"
import MdiCloseCircleOutline from "~icons/mdi/close-circle-outline"
import MdiNumeric0 from "~icons/mdi/numeric-0"
import MdiNumeric1 from "~icons/mdi/numeric-1"
import MdiNumeric2 from "~icons/mdi/numeric-2"
import MdiNumeric3 from "~icons/mdi/numeric-3"
import MdiNumeric4 from "~icons/mdi/numeric-4"
import MdiNumeric5 from "~icons/mdi/numeric-5"
import MdiNumeric6 from "~icons/mdi/numeric-6"
import MdiNumeric7 from "~icons/mdi/numeric-7"
import MdiNumeric8 from "~icons/mdi/numeric-8"
import MdiNumeric9 from "~icons/mdi/numeric-9"
import MdiNumeric9Plus from "~icons/mdi/numeric-9-plus"
import { FormContextValue } from "../../../pages/research/ResearchDetailPage"
import ArrayFieldExplicitNullableItemTemplate from "./ArrayFieldExplicitNullableItemTemplate"
type PossibleChoice = `reporting_${number}` | "not_reporting"

interface SchemaExtensionNullableArray {
  options: { label: string; value: PossibleChoice }[]
}

const ICON_CLASSNAME = "h-6 w-6 opacity-60"
const ICON_MAP: Record<
  PossibleChoice | "reporting_9plus" | "_default",
  ReactElement
> = {
  not_reporting: <MdiCloseCircleOutline className={ICON_CLASSNAME} />,
  reporting_0: <MdiNumeric0 className={ICON_CLASSNAME} />,
  reporting_1: <MdiNumeric1 className={ICON_CLASSNAME} />,
  reporting_2: <MdiNumeric2 className={ICON_CLASSNAME} />,
  reporting_3: <MdiNumeric3 className={ICON_CLASSNAME} />,
  reporting_4: <MdiNumeric4 className={ICON_CLASSNAME} />,
  reporting_5: <MdiNumeric5 className={ICON_CLASSNAME} />,
  reporting_6: <MdiNumeric6 className={ICON_CLASSNAME} />,
  reporting_7: <MdiNumeric7 className={ICON_CLASSNAME} />,
  reporting_8: <MdiNumeric8 className={ICON_CLASSNAME} />,
  reporting_9: <MdiNumeric9 className={ICON_CLASSNAME} />,
  reporting_9plus: <MdiNumeric9Plus className={ICON_CLASSNAME} />,
  _default: <MdiCheckboxBlankCircleOutline className={ICON_CLASSNAME} />,
}

const getOptionIcon = (option: PossibleChoice) => {
  if (option === "not_reporting") return ICON_MAP.not_reporting
  if (option.startsWith("reporting_")) {
    const num = Number(option.split("_")[1])
    if (num >= 9) return ICON_MAP.reporting_9plus
    return ICON_MAP[`reporting_${num}` as PossibleChoice]
  }
  return ICON_MAP._default
}

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldExplicitNullableTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    idSchema,
    uiSchema,
    items,
    onAddClick,
    registry,
    required,
    schema,
    title,
  } = props
  const nullableArrayOptions = (schema as any)["x-nullableArray"] as
    | SchemaExtensionNullableArray
    | undefined
  const options = useMemo(() => {
    if (nullableArrayOptions?.options) return nullableArrayOptions.options

    const options: { label: string; value: PossibleChoice }[] = []
    if (!required) {
      options.push({ label: "不汇报此数据项", value: "not_reporting" })
    }
    const reportingItemsCount: number[] = []
    if ((schema as any).numItems) {
      reportingItemsCount.push(...(schema as any).numItems)
    } else {
      for (let i = schema.minItems || 0; i <= (schema.maxItems || 0); i++) {
        reportingItemsCount.push(i)
      }
    }
    for (const count of reportingItemsCount) {
      options.push({
        label: `汇报此数据项，子条目共 ${count} 个`,
        value: `reporting_${count}`,
      })
    }
    return options
  }, [schema, required])
  const [value, setValue] = useState<PossibleChoice>(options[0].value)
  const requestDeleteFns: Map<number, () => void> = new Map()
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions)
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions)

  // due to the limitation of rjsf, we have to use this hacky way to change the number of items
  // because we can only change 1 item at 1 render cycle, we have to use a state to record the delta
  const [pendingItemCountChangeDelta, setPendingItemCountChangeDelta] =
    useState<number>(0)

  // changeItemCountTo submits the change to the number of items to pendingItemCountChangeDelta
  const changeItemCountTo = (count: number) => {
    setPendingItemCountChangeDelta(count - items.length)
  }

  // now we reconcile the pendingItemCountChangeDelta.
  // we only change 1 item at 1 render cycle.
  const reconcilePendingItemCountChangeDelta = () => {
    const deltaToZero =
      pendingItemCountChangeDelta > 0
        ? 1
        : pendingItemCountChangeDelta < 0
        ? -1
        : 0
    if (deltaToZero === 0) {
      return
    }

    if (deltaToZero > 0) {
      // add item
      onAddClick()
    } else {
      // delete item
      const index = items.length - 1
      const fn = requestDeleteFns.get(index)
      if (fn) {
        fn()
      }
    }
    setPendingItemCountChangeDelta(pendingItemCountChangeDelta - deltaToZero)
  }
  useEffect(() => {
    reconcilePendingItemCountChangeDelta()
  }, [pendingItemCountChangeDelta])

  useEffect(() => {
    const formContext =
      props.formContext as unknown as MutableRefObject<FormContextValue>
    if (value === "not_reporting") {
      formContext.current.explicitlyUndefinedFields.add(idSchema.$id)
      console.info(
        "add",
        idSchema.$id,
        formContext.current.explicitlyUndefinedFields,
      )
    } else {
      formContext.current.explicitlyUndefinedFields.delete(idSchema.$id)
      console.info(
        "delete",
        idSchema.$id,
        formContext.current.explicitlyUndefinedFields,
      )
    }
  }, [value])

  useEffect(() => {
    const newLength = items.length
    if (newLength === 0 && !["reporting_0", "not_reporting"].includes(value)) {
      setValue("not_reporting")
    }
  }, [items])

  return (
    <Paper className="shadow-heavy">
      <Box p={2}>
        <ArrayFieldTitleTemplate
          idSchema={idSchema}
          title={uiOptions.title || title}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          registry={registry}
        />
        <ArrayFieldDescriptionTemplate
          idSchema={idSchema}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        <FormControl fullWidth className="mt-4">
          <InputLabel id={`${idSchema.$id}-label`}>
            选择汇报数据项数量
          </InputLabel>
          <Select
            value={value}
            labelId={`${idSchema.$id}-label`}
            id={`${idSchema.$id}-select`}
            label="选择汇报数据项数量"
            size="small"
            onChange={e => {
              setValue(e.target.value as PossibleChoice)
              if (e.target.value === "not_reporting") {
                changeItemCountTo(0)
              } else {
                changeItemCountTo(Number(e.target.value.split("_")[1]))
              }
            }}
          >
            {options.map(({ label, value }) => (
              <MenuItem value={value} className="font-mono" key={value}>
                <div className="flex items-center gap-2 w-full">
                  <span>{getOptionIcon(value)}</span>

                  <span>{label}</span>

                  <span className="flex-1" />

                  <span className="text-xs font-mono tracking-tighter text-slate-300 truncate text-ellipsis">
                    {value}
                  </span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid
          container
          key={`array-item-list-${idSchema.$id}`}
          className="mt-2 space-y-2"
        >
          {items &&
            items.map(
              (
                { key, ...itemProps }: ArrayFieldTemplateItemType<T, S, F>,
                i: number,
              ) => {
                const fn = (fn: () => void) => {
                  requestDeleteFns.set(i, fn)
                }
                return (
                  <ArrayFieldExplicitNullableItemTemplate
                    key={key}
                    {...itemProps}
                    onRequestDelete={fn}
                  />
                )
              },
            )}
        </Grid>
      </Box>
    </Paper>
  )
}
