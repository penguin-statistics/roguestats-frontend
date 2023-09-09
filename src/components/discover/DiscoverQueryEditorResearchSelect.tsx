import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { FC, useId } from "react"
import { Control, useController } from "react-hook-form"
import { graphql, useLazyLoadQuery } from "react-relay"
import { QueryInput } from "../../components/discover/DiscoverQuerier"
import { nodesFromEdges } from "../../utils/connection"
import { useDiscoverQueryEditorContext } from "./DiscoverQueryEditorContext"
import { DiscoverQueryEditorResearchSelectQuery } from "./__generated__/DiscoverQueryEditorResearchSelectQuery.graphql"

export const DiscoverQueryEditorResearchSelect: FC<{
  control: Control<QueryInput>
}> = ({ control }) => {
  const id = useId()
  const {
    field: { onChange, ...field },
    fieldState: { error, invalid },
  } = useController({
    name: "researchId",
    control,
    rules: { required: "请选择课题" },
  })
  const { setState } = useDiscoverQueryEditorContext()

  const data = useLazyLoadQuery<DiscoverQueryEditorResearchSelectQuery>(
    graphql`
      query DiscoverQueryEditorResearchSelectQuery {
        researches {
          edges @required(action: THROW) {
            node @required(action: THROW) {
              id
              name
              schema
            }
          }
        }
      }
    `,
    {},
  )

  const nodes = nodesFromEdges(data.researches.edges)

  return (
    <FormControl fullWidth error={invalid}>
      <InputLabel id={`${id}-label`}>课题*</InputLabel>
      <Select
        {...field}
        id={`${id}-select`}
        labelId={`${id}-label`}
        variant="outlined"
        label="课题*"
        fullWidth
        error={invalid}
        onChange={e => {
          onChange(e)
          setState({
            researchSchema: nodes.find(node => node.id === e.target.value)
              ?.schema,
          })
        }}
      >
        {nodes.map(node => (
          <MenuItem key={node.id} value={node.id}>
            {node.name}
          </MenuItem>
        ))}
      </Select>

      {error && (
        <Typography
          variant="caption"
          color="textSecondary"
          className="text-red-600 pt-1"
        >
          {error.message}
        </Typography>
      )}
    </FormControl>
  )
}
