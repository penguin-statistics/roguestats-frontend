import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import { CSSProperties } from "react"

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    disabled,
    hasToolbar,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onCopyIndexClick,
    onDropIndexClick,
    onReorderClick,
    readonly,
    uiSchema,
    registry,
  } = props
  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates
  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
    minWidth: 0,
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

          {hasToolbar && (
            <div className="flex flex-col">
              {(hasMoveUp || hasMoveDown) && (
                <MoveUpButton
                  style={btnStyle}
                  disabled={disabled || readonly || !hasMoveUp}
                  onClick={onReorderClick(index, index - 1)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
              {(hasMoveUp || hasMoveDown) && (
                <MoveDownButton
                  style={btnStyle}
                  disabled={disabled || readonly || !hasMoveDown}
                  onClick={onReorderClick(index, index + 1)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
              {hasCopy && (
                <CopyButton
                  style={btnStyle}
                  disabled={disabled || readonly}
                  onClick={onCopyIndexClick(index)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
              {hasRemove && (
                <RemoveButton
                  style={btnStyle}
                  disabled={disabled || readonly}
                  onClick={onDropIndexClick(index)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}
