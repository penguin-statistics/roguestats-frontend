import { Button, CircularProgress, Paper } from "@mui/material"
import { FC, Suspense, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

import {
  DiscoverQuerier,
  QueryInput,
} from "../../components/discover/DiscoverQuerier"
import { DiscoverQueryEditorContext } from "../../components/discover/DiscoverQueryEditorContext"
import { DiscoverQueryEditorFilter } from "../../components/discover/DiscoverQueryEditorFilter"
import { DiscoverQueryEditorRemapper } from "../../components/discover/DiscoverQueryEditorRemapper"
import { DiscoverQueryEditorResearchSelect } from "../../components/discover/DiscoverQueryEditorResearchSelect"
import { DiscoverQueryEditorStep } from "../../components/discover/DiscoverQueryEditorStep"

export const DiscoverPage: FC = () => {
  const [query, setQuery] = useState<QueryInput | null>(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setRefresh(refresh => refresh + 1)
  }, [query])

  return (
    <div className="min-h-full w-full flex flex-col gap-4">
      <DiscoverQueryEditor onSubmit={setQuery} />

      <Suspense fallback={<div>Loading...</div>}>
        {query && <DiscoverQuerier input={query} key={refresh} />}
      </Suspense>
    </div>
  )
}

const DiscoverQueryEditor: FC<{
  onSubmit: (query: QueryInput) => void
}> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<QueryInput>()
  const index0Completed = useWatch({ control, name: "researchId" })
  const debugWatchedFormState = useWatch({ control })

  return (
    <DiscoverQueryEditorContext>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper className="p-4 flex flex-col gap-4">
          <code>
            <pre className="bg-slate-100 p-4">
              {JSON.stringify(debugWatchedFormState, null, 4)}
            </pre>
          </code>

          <DiscoverQueryEditorStep index={0} title="选择查询课题">
            <Suspense fallback={<CircularProgress />}>
              <DiscoverQueryEditorResearchSelect control={control} />
            </Suspense>
          </DiscoverQueryEditorStep>

          <DiscoverQueryEditorStep
            index={1}
            title="过滤数据条目"
            disabled={!index0Completed}
          >
            <DiscoverQueryEditorFilter control={control} />
          </DiscoverQueryEditorStep>

          <DiscoverQueryEditorStep
            index={2}
            title="重映射表达式"
            disabled={!index0Completed}
          >
            <DiscoverQueryEditorRemapper control={control} />
          </DiscoverQueryEditorStep>

          <Button type="submit" variant="contained" size="large">
            查询
          </Button>
        </Paper>
      </form>
    </DiscoverQueryEditorContext>
  )
}
