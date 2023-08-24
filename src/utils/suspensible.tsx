import { CircularProgress } from "@mui/material"
import { FC, PropsWithChildren, Suspense } from "react"

export const Suspensible: FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<CircularProgress />}>{children}</Suspense>
}

export const withSuspensible = <T extends object>(Component: FC<T>) => {
  return (props: T) => (
    <Suspensible>
      <Component {...props} />
    </Suspensible>
  )
}
