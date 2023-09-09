import { Close } from "@mui/icons-material"
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { JSONSchema7TypeName } from "json-schema"
import { FC, ReactNode, useCallback, useId, useMemo } from "react"
import { Control, useController } from "react-hook-form"
import QueryBuilder, {
  ActionWithRulesAndAddersProps,
  Field,
  Option,
  RuleGroupType,
  ValueSelectorProps,
} from "react-querybuilder"
import { QueryInput } from "../../components/discover/DiscoverQuerier"
import { useDiscoverQueryEditorContext } from "./DiscoverQueryEditorContext"
import "./DiscoverQueryEditorFilter.scss"
import { convertToJsonPredicate } from "./convertToJsonPredicate"

const AVAILABLE_OPERATORS = [
  {
    name: "$eq",
    label: "等于",
    type: ["string", "integer", "number", "boolean"],
  },
  {
    name: "$ne",
    label: "不等于",
    type: ["string", "integer", "number", "boolean"],
  },
  { name: "$gt", label: "大于", type: ["integer", "number"] },
  { name: "$ge", label: "大于等于", type: ["integer", "number"] },
  { name: "$lt", label: "小于", type: ["integer", "number"] },
  { name: "$le", label: "小于等于", type: ["integer", "number"] },
  {
    name: "$contains",
    label: "包含一个",
    type: ["integer", "number", "array"],
  },
  {
    name: "$in",
    label: "包含多个中的一个",
    type: ["integer", "number", "array"],
  },
]

export const DiscoverQueryEditorFilter: FC<{
  control: Control<QueryInput>
}> = ({ control }) => {
  const {
    field: { onChange },
  } = useController({
    name: "where.contentJsonPredicate",
    control,
    rules: { required: "请填写筛选条件" },
  })
  const { state: contextState } = useDiscoverQueryEditorContext()
  const fields = useMemo(() => {
    if (!contextState.researchSchema) return []

    return Object.entries(contextState.researchSchema.properties ?? {}).flatMap(
      ([key, value]) => {
        if (typeof value === "boolean") return []

        return [
          {
            id: key,
            name: key,
            label: value.title ?? key,
            // "$eq", "$ne", "$gt", "$ge", "$lt", "$le", "$in", "$contains":
            operators: AVAILABLE_OPERATORS.filter(operator =>
              operator.type.includes(value.type as JSONSchema7TypeName),
            ),
            // value.type =
            // | 'string'
            // | 'number'
            // | 'integer'
            // | 'boolean'
            // | 'object' // not supported
            // | 'array'
            // | 'null';
            // inputType: 'text' | 'number' | 'date'
            inputType: (() => {
              if (value.type === "number") return "number"
              if (value.type === "integer") return "number"
              return "text"
            })(),
          } satisfies Field,
        ]
      },
    )
  }, [contextState.researchSchema])

  const handleQueryChange = useCallback(
    (query: RuleGroupType) => {
      const converted = convertToJsonPredicate(query)
      console.log("query", query, "converted", converted)
      onChange(converted)
    },
    [onChange],
  )

  return (
    <QueryBuilder
      fields={fields}
      onQueryChange={handleQueryChange}
      controlElements={{
        combinatorSelector: ValueSelector,
        fieldSelector: ValueSelector,
        operatorSelector: ValueSelector,
        addRuleAction: AddRuleAction,
        addGroupAction: AddGroupAction,
        removeRuleAction: RemoveRuleAction,
        removeGroupAction: RemoveGroupAction,
      }}
      combinators={[
        { name: "and", label: "与/AND" },
        { name: "or", label: "或/OR" },
      ]}
    />
  )
}

const ValueSelector: FC<ValueSelectorProps> = ({
  value,
  handleOnChange,
  title,
  options,
  multiple,
}) => {
  const id = useId()

  return (
    <FormControl>
      <InputLabel id={`${id}-label`} htmlFor={id}>
        {title}
      </InputLabel>
      <Select
        size="small"
        value={value}
        onChange={(event: SelectChangeEvent<string>) =>
          handleOnChange(event.target.value)
        }
        id={id}
        labelId={`${id}-label`}
        label={title}
        multiple={multiple}
        className="font-mono"
      >
        {(options as Option<string>[]).map((option: Option<string>) => (
          <MenuItem
            key={option.name || option.id}
            value={option.name || option.id}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const ActionButton: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
  label: ReactNode
}> = ({ handleOnClick, label }) => {
  return (
    <Button variant="contained" size="small" onClick={handleOnClick}>
      {label}
    </Button>
  )
}

const ActionIconButton: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
  label: ReactNode
}> = ({ handleOnClick, label }) => {
  return (
    <IconButton size="small" onClick={handleOnClick}>
      {label}
    </IconButton>
  )
}

const AddRuleAction: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
}> = ({ handleOnClick }) => (
  <ActionButton label="添加条件" handleOnClick={handleOnClick} />
)

const AddGroupAction: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
}> = ({ handleOnClick }) => (
  <ActionButton label="添加组" handleOnClick={handleOnClick} />
)

const RemoveRuleAction: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
}> = ({ handleOnClick }) => (
  <ActionIconButton label={<Close />} handleOnClick={handleOnClick} />
)

const RemoveGroupAction: FC<{
  handleOnClick: ActionWithRulesAndAddersProps["handleOnClick"]
}> = ({ handleOnClick }) => (
  <ActionIconButton label={<Close />} handleOnClick={handleOnClick} />
)
