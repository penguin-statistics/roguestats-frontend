import { Button, Card } from "@mui/material"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useNavigate } from "react-router-dom"
import { setToken } from "../utils/storage"
import { DashboardQuery } from "./__generated__/DashboardQuery.graphql"

export const Dashboard = () => {
  const navigate = useNavigate()
  const response = useLazyLoadQuery<DashboardQuery>(
    graphql`
      query DashboardQuery($first: Int!, $after: ID) {
        researches {
          id
          name
          eventsConnection(first: $first, after: $after)
            @connection(key: "Dashboard_eventsConnection") {
            edges {
              node {
                id
                createdAt
                researchId
                userAgent
                userId
                content
              }
              cursor
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }

        me {
          id
          name
          email
        }
      }
    `,
    {
      first: 20,
    },
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <Card>Welcome, {response.me.name}!</Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setToken("")
          navigate("/")
        }}
      >
        Logout
      </Button>
      <h2 className="text-lg">Researches</h2>
      {response.researches.map(research => (
        <Card className="p-4 shadow-lg" key={research.id}>
          <h1 className="text-lg">{research.name}</h1>
          <ul className="list-disc list-inside">
            {research.eventsConnection?.edges.map(edge => (
              <li key={edge.node.id}>
                {edge.node.createdAt} by {edge.node.userAgent} (
                {edge.node.userId})
              </li>
            ))}
            {research.eventsConnection?.pageInfo.hasNextPage && <li>...</li>}
          </ul>
        </Card>
      ))}
    </div>
  )
}
