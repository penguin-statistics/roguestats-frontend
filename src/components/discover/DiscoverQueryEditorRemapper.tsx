import { FormControl, TextField } from "@mui/material"
import { FC } from "react"
import { Control, useController } from "react-hook-form"
import { QueryInput } from "../../components/discover/DiscoverQuerier"

export const DiscoverQueryEditorRemapper: FC<{
  control: Control<QueryInput>
}> = ({ control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "resultMappingInput",
    control,
    rules: { required: "请填写重映射规则" },
  })

  return (
    <FormControl fullWidth>
      <TextField
        {...field}
        label="重映射规则"
        error={!!error}
        helperText={error?.message}
      />
    </FormControl>
  )
}
