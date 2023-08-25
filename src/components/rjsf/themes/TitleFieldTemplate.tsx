import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils"

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ id, title }: TitleFieldProps<T, S, F>) {
  return (
    <Box id={id} className="flex flex-col gap-2 mb-2">
      <Typography variant="h5">{title}</Typography>
      <Divider />
    </Box>
  )
}
