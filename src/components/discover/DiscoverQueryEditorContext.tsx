import { StrictRJSFSchema } from "@rjsf/utils"
import { FC, createContext, useContext, useMemo, useState } from "react"

export type DiscoverQueryEditorContextState = {
  researchSchema: StrictRJSFSchema | null
}

const DiscoverQueryEditorContextObject = createContext<{
  state: DiscoverQueryEditorContextState
  setState: (state: DiscoverQueryEditorContextState) => void
}>({
  state: {
    researchSchema: null,
  },
  setState: () => {
    throw new Error("DiscoverQueryEditorContextObject not initialized")
  },
})

export const DiscoverQueryEditorContext: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState<DiscoverQueryEditorContextState>({
    researchSchema: null,
  })

  const memoizedValue = useMemo(() => ({ state, setState }), [state, setState])

  return (
    <DiscoverQueryEditorContextObject.Provider value={memoizedValue}>
      {children}
    </DiscoverQueryEditorContextObject.Provider>
  )
}

export const useDiscoverQueryEditorContext = () =>
  useContext(DiscoverQueryEditorContextObject)
