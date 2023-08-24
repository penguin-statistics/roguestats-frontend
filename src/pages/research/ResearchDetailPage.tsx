import { Card } from "@mui/material"
import validator from "@rjsf/validator-ajv8"
import { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useParams } from "react-router-dom"
import { Form } from "../../components/rjsf/Form"
import { ResearchDetailPageQuery } from "./__generated__/ResearchDetailPageQuery.graphql"

export const ResearchDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) throw new Error("id is required")

  const data = useLazyLoadQuery<ResearchDetailPageQuery>(
    graphql`
      query ResearchDetailPageQuery($id: ID!) {
        research(id: $id) {
          id
          name
          schema
        }
      }
    `,
    { id },
  )

  return (
    <Card className="p-4 shadow-lg">
      <h1 className="text-lg">{data.research.name}</h1>
      <Form schema={data.research.schema} validator={validator} />
    </Card>
  )
}
