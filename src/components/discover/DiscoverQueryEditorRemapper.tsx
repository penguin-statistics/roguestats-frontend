import { FormControl, TextField } from "@mui/material"
import { FC } from "react"
import { Control, useController } from "react-hook-form"
import { QueryInput } from "../../components/discover/DiscoverQuerier"

// Remapper shall be a string that:
// - contains `content`
// - has 1 or more pair of matching parentheses `()`
const validateRemapper = (value: string) => {
  const contentIndex = value.indexOf("content")
  if (contentIndex === -1) {
    return "重映射规则必须包含向 content 的引用"
  }

  let currentDepth = 0
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "(") {
      currentDepth++
    } else if (value[i] === ")") {
      currentDepth--
    }

    if (currentDepth < 0) {
      return "重映射规则中的括号不匹配：括号使用必须严格嵌套，但是出现了多余的右括号"
    }
  }

  if (currentDepth > 0) {
    return "重映射规则中的括号不匹配：括号使用必须严格嵌套，但是出现了多余的左括号"
  }

  return true
}

export const DiscoverQueryEditorRemapper: FC<{
  control: Control<QueryInput>
}> = ({ control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "resultMappingInput",
    control,
    rules: { required: "请填写重映射规则", validate: validateRemapper },
  })

  return (
    <FormControl fullWidth>
      <TextField
        {...field}
        label="重映射规则"
        error={!!error}
        helperText={error?.message}
        className="font-mono"
      />
    </FormControl>
  )
}
