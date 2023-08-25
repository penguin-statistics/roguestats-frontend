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

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    disabled,
    idSchema,
    uiSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions)
  const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate", T, S, F>(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions,
  )
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions)
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates
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
        <Grid
          container
          key={`array-item-list-${idSchema.$id}`}
          className="mt-2 space-y-2"
        >
          {items &&
            items.map(
              ({ key, ...itemProps }: ArrayFieldTemplateItemType<T, S, F>) => (
                <ArrayFieldItemTemplate key={key} {...itemProps} />
              ),
            )}
          {canAdd && (
            <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
              <AddButton
                className="array-item-add"
                onClick={onAddClick}
                disabled={disabled || readonly}
                uiSchema={uiSchema}
                registry={registry}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}
