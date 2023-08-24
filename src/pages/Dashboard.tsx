import { Card } from "@mui/material"
import validator from "@rjsf/validator-ajv8"
import { FC } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { Form } from "../components/rjsf/Form"
import { DashboardQuery } from "./__generated__/DashboardQuery.graphql"
import { DashboardResearchFragment$key } from "./__generated__/DashboardResearchFragment.graphql"

export const Dashboard = () => {
  const data = useLazyLoadQuery<DashboardQuery>(
    graphql`
      query DashboardQuery {
        researches {
          id
          ...DashboardResearchFragment
        }

        me {
          name
        }
      }
    `,
    {},
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Hi, {data.me.name}</h1>
      <h2 className="text-lg">正在进行的 RogueStats 课题</h2>
      {data.researches.map(research => (
        <ResearchCard key={research.id} research={research} />
      ))}
    </div>
  )
}

const ResearchCard: FC<{
  research: DashboardResearchFragment$key
}> = ({ research }) => {
  const data = useFragment<DashboardResearchFragment$key>(
    graphql`
      fragment DashboardResearchFragment on Research {
        id
        name
        schema
      }
    `,
    research,
  )

  return (
    <Card className="p-4 shadow-lg">
      <h1 className="text-lg">{data.name}</h1>
      <Form schema={data.schema} validator={validator} />
    </Card>
  )
}
