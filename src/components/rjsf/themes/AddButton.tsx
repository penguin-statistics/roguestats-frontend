import AddIcon from "@mui/icons-material/Add"
import { Button } from "@mui/material"
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils"

/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiSchema,
  registry,
  ...props
}: IconButtonProps<T, S, F>) {
  const { translateString } = registry
  return (
    <Button
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      color="primary"
      variant="contained"
      startIcon={<AddIcon />}
    >
      添加
    </Button>
  )
}
