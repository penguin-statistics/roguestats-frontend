import {
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  Toolbar,
} from "@mui/material"
import RJSFForm, { IChangeEvent } from "@rjsf/core"
import { FC, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { graphql, useLazyLoadQuery, useMutation } from "react-relay"
import { useParams } from "react-router-dom"
import { Form } from "../../components/rjsf/Form"
import { ResearchDetailPageMutation } from "./__generated__/ResearchDetailPageMutation.graphql"
import { ResearchDetailPageQuery } from "./__generated__/ResearchDetailPageQuery.graphql"

export const ResearchDetailPage: FC = () => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
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
      mutation ResearchDetailPageMutation($input: NewEvent!) {
        createEvent(input: $input) {
          id
        }
      }
    `,
  )

  const handleSubmit = (data: IChangeEvent) => {
    const activeElement = document.activeElement as HTMLElement | undefined
    activeElement?.blur()

    commit({
      variables: {
        input: {
          researchId: id,
          content: data.formData,
          userAgent: "roguestats-frontend/" + import.meta.env.VITE_VERSION,
        },
      },
      onCompleted: data => {
        toast.success(`成功提交事件 ${data.createEvent.id}`)
        formRef.current?.reset()
      },
      onError(error) {
        toast.error("提交失败：" + error.message)
      },
    })
  }

  return (
    <Card className="shadow-lg relative" key={data.research.id}>
      <Toolbar className="bg-slate-900 text-white py-4">
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
          onSubmit={() => setConfirmationDialogOpen(true)}
          readonly={isInFlight}
        />
      </CardContent>

      {isInFlight && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}

      <Dialog
        maxWidth="lg"
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        {confirmationDialogOpen && (
          <ResearchSubmissionConfirmationDialogContent
            onClose={commit => {
              setConfirmationDialogOpen(false)
              if (commit) handleSubmit(formRef.current?.state.formData)
            }}
            schema={data.research.schema}
            formData={formRef.current?.state.formData}
          />
        )}
      </Dialog>
    </Card>
  )
}

const ResearchSubmissionConfirmationDialogContent: FC<{
  onClose: (commit: boolean) => void

  schema: any
  formData?: any
}> = ({ onClose, schema, formData }) => {
  return (
    <DialogContent className="p-4">
      <h1 className="text-xl font-bold mb-2">确认提交</h1>
      <p className="mb-2">
        请确认您的提交内容：
        <pre className="bg-slate-900 p-2 rounded-md text-white text-sm">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </p>

      <Form formData={formData} schema={schema} readonly />

      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-red-500 text-white"
          onClick={() => onClose(false)}
        >
          取消
        </button>
        <button
          className="px-4 py-2 rounded-md bg-green-500 text-white ml-2"
          onClick={() => onClose(true)}
        >
          提交
        </button>
      </div>
    </DialogContent>
  )
}
