import { Card, CardContent, CircularProgress, Toolbar } from "@mui/material"
import RJSFForm, { IChangeEvent } from "@rjsf/core"
import { FC, useRef } from "react"
import { toast } from "react-hot-toast"
import { graphql, useLazyLoadQuery, useMutation } from "react-relay"
import { useParams } from "react-router-dom"
import { Form } from "../../components/rjsf/Form"
import { envBuildCommit } from "../../utils/env"
import { formatError } from "../../utils/friendlyError"
import { ResearchDetailPageMutation } from "./__generated__/ResearchDetailPageMutation.graphql"
import { ResearchDetailPageQuery } from "./__generated__/ResearchDetailPageQuery.graphql"

export const ResearchDetailPage: FC = () => {
  const formRef = useRef<RJSFForm>(null)
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

  const [commit, isInFlight] = useMutation<ResearchDetailPageMutation>(
    graphql`
      mutation ResearchDetailPageMutation($input: CreateEventInput!) {
        createEvent(input: $input) {
          id
        }
      }
    `,
  )
  if (!data.research) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    )
  }

  const handleSubmit = (data: IChangeEvent) => {
    const activeElement = document.activeElement as HTMLElement | undefined
    activeElement?.blur()

    commit({
      variables: {
        input: {
          researchID: id,
          content: data.formData,
          userAgent: "roguestats-frontend/" + (envBuildCommit || "unknown"),
        },
      },
      onCompleted: data => {
        toast.success(
          <span className="flex flex-col items-start">
            已成功提交事件
            <span className="font-mono text-sm font-normal">
              {data.createEvent.id}
            </span>
          </span>,
        )
        formRef.current?.reset()
      },
      onError(error) {
        toast.error(`提交失败：${formatError(error)}`)
      },
    })
  }

  return (
    <Card className="shadow-lg relative" key={data.research.id}>
      <Toolbar className="bg-slate-900 text-white py-4 shadow select-none flex items-center">
        <div className="flex flex-col">
          <h4 className="text-sm leading-none mb-1.5">汇报</h4>
          <h1 className="text-xl leading-none font-bold">
            {data.research.name}
          </h1>
        </div>
      </Toolbar>
      <CardContent>
        <Form
          ref={formRef}
          schema={data.research.schema}
          onSubmit={handleSubmit}
          readonly={isInFlight}
        />
      </CardContent>

      {isInFlight && (
        <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </Card>
  )
}
