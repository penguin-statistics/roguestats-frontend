import { ChevronRight } from "@mui/icons-material"
import { ButtonBase, Card, CircularProgress } from "@mui/material"
import clsx from "clsx"
import { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { Link, Outlet, useMatch } from "react-router-dom"
import { ResearchIndexPageQuery } from "./__generated__/ResearchIndexPageQuery.graphql"

export const ResearchIndexPage = () => {
  const matches = useMatch("/research/:id")
  const data = useLazyLoadQuery<ResearchIndexPageQuery>(
    graphql`
      query ResearchIndexPageQuery {
        researches {
          id
          name
        }

        me {
          name
        }
      }
    `,
    {},
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Hi, {data.me.name}</h1>
      <h2 className="text-lg">正在进行的 RogueStats 课题</h2>

      <div className="flex items-start gap-4">
        <div className="w-48 flex flex-col gap-2">
          {data.researches.map(research => (
            <Link to={`/research/${research.id}`} key={research.id}>
              <ButtonBase
                key={research.id}
                color="transparent"
                className="shadow-lg w-full"
              >
                <Card
                  className={clsx(
                    "h-full w-full p-4 text-left flex transition",
                    matches?.params.id === research.id && "bg-black text-white",
                  )}
                >
                  <div>{research.name}</div>

                  {matches?.params.id === research.id && (
                    <ChevronRight className="ml-auto" />
                  )}
                </Card>
              </ButtonBase>
            </Link>
          ))}
        </div>

        <div className="flex-1">
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
