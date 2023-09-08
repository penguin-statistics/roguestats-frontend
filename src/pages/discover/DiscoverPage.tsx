import { Paper, TextareaAutosize } from "@mui/material"
import { FC, Suspense, useState } from "react"
import {
  DiscoverQuerier,
  QueryInput,
} from "../../components/discover/DiscoverQuerier"

export const DiscoverPage: FC = () => {
  const [query, setQuery] = useState<QueryInput | null>(null)

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <DiscoverQueryEditor onChange={setQuery} />

      <Suspense fallback={<div>Loading...</div>}>
        {query && <DiscoverQuerier input={query} />}
      </Suspense>
    </div>
  )
}

const DiscoverQueryEditor: FC<{
  onChange: (query: QueryInput) => void
}> = ({ onChange }) => {
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      {error && <Paper className="text-red-500 p-4">{error}</Paper>}
      <TextareaAutosize
        className="h-full w-full min-h-[10rem] p-4"
        onChange={e => {
          try {
            onChange(JSON.parse(e.target.value) as QueryInput)
            setError(null)
          } catch (e) {
            const err = e as Error
            setError(err.message ?? "Unknown error")
          }
        }}
        minRows={3}
        maxRows={10}
        placeholder="Query"
      />
    </>
  )
}
