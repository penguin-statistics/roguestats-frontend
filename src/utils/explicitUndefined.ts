// formatExplicitUndefined is a function that takes in a value and an array of fields
// and modifies the value to explicitly set any fields in the array to undefined
export const formatExplicitUndefined = (value: any, fields: string[]) => {
  const newValue = { ...value }
  const replacedFields = fields.map(field => field.replace(/^root_/, ""))
  console.info("formatExplicitUndefined", value, fields, replacedFields)
  replacedFields.forEach(field => {
    newValue[field] = undefined
  })
  console.info("formatExplicitUndefined", newValue)
  return newValue
}
