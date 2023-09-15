import { Check, Checklist } from "@mui/icons-material"
import {
  Autocomplete,
  FilterOptionsState,
  InputAdornment,
  MenuItem,
  Paper,
  PaperProps,
} from "@mui/material"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import {
  EnumOptionsType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  labelValue,
} from "@rjsf/utils"
import Fuse from "fuse.js"
import { FC, useMemo } from "react"
import MdiCheckboxMarkedCircleOutline from "~icons/mdi/checkbox-marked-circle-outline"

const ShadowPaper: FC<PaperProps> = ({ children, ...props }) => (
  <Paper elevation={12} {...props}>
    {children}
  </Paper>
)

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name, // remove this from textFieldProps
  options,
  label,
  hideLabel,
  required,
  disabled,
  placeholder,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlur,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFocus,
  rawErrors = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hideError,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formContext,
  ...textFieldProps
}: WidgetProps<T, S, F>) {
  const { enumOptions, emptyValue: optEmptyVal } = options

  multiple = typeof multiple === "undefined" ? false : !!multiple

  const emptyValue = multiple ? [] : ""
  const isEmpty =
    typeof value === "undefined" ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue)

  const _onChange = (_: any, value: string | string[] | null) => {
    onChange(value ?? optEmptyVal)
  }

  // build a enum options value to option map
  const enumOptionsValueToOptionMap = useMemo(() => {
    const map = new Map<string, EnumOptionsType<S>>()
    enumOptions?.forEach(option => {
      const { value } = option
      map.set(value, option)
    })
    return map
  }, [enumOptions])

  const filterOptions = useMemo(() => {
    if (!enumOptions) return () => []

    const engine = new Fuse(enumOptions, {
      includeScore: true,
      threshold: 0.4,
      keys: ["schema.alias", "label"],
    })

    return (_: any, { inputValue }: FilterOptionsState<string>) => {
      if (!inputValue) return enumOptions.map(({ value }) => value)

      const results = engine.search(inputValue)
      results.sort((a, b) => a.score! - b.score!)
      return results.map(({ item }) => item.value)
    }
  }, [enumOptions])

  return (
    <Autocomplete<string, any>
      id={id}
      value={isEmpty ? emptyValue : value}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      multiple={multiple}
      options={enumOptions!.map(({ value }) => value) || []}
      getOptionLabel={value => {
        const option = enumOptionsValueToOptionMap.get(value)
        return option ? option.label : ""
      }}
      onChange={_onChange}
      disableCloseOnSelect={multiple}
      filterOptions={filterOptions}
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props} selected={selected} color="transparent">
          <div className="flex items-center gap-2 w-full">
            <span>{enumOptionsValueToOptionMap.get(option)?.label}</span>

            {selected && <Check className="text-slate-700" fontSize="small" />}

            <span className="flex-1" />

            <span className="text-xs font-mono tracking-tighter text-slate-300 truncate text-ellipsis">
              {enumOptionsValueToOptionMap.get(option)?.value}
            </span>
          </div>
        </MenuItem>
      )}
      openOnFocus
      PaperComponent={ShadowPaper}
      renderInput={params => (
        <TextField
          {...params}
          {...(textFieldProps as TextFieldProps)}
          label={labelValue(label || undefined, hideLabel, false)}
          name={id}
          required={required}
          variant="outlined"
          error={rawErrors.length > 0}
          InputLabelProps={{
            ...textFieldProps.InputLabelProps,
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" className="pl-1">
                {multiple ? (
                  <Checklist />
                ) : (
                  <MdiCheckboxMarkedCircleOutline className="w-6 h-6" />
                )}
              </InputAdornment>
            ),
            classes: {
              input: "!pl-0",
            },
          }}
          aria-describedby={ariaDescribedByIds<T>(id)}
        />
      )}
    />
  )
}
