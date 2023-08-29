import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"

/** The `ArrayFieldExplicitNullableItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldExplicitNullableItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(
  props: ArrayFieldTemplateItemType<T, S, F> & {
    onRequestDelete?: (fn: () => void) => void
  },
) {
  const { children, index, onDropIndexClick, onRequestDelete } = props

  if (onRequestDelete) {
    onRequestDelete(() => {
      onDropIndexClick(index)()
    })
  }

  return (
    <Grid container={true} alignItems="center">
      <Grid item={true} xs>
        <Paper className="shadow-heavy flex items-center p-4 gap-2">
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {children}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
