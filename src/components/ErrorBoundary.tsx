import { Button } from "@mui/material"
import { FC } from "react"
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary"
import { Cover } from "./Tegami"

export const ErrorBoundaryFallback: ErrorBoundaryProps["FallbackComponent"] = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Cover>
      <h4 className="text-xl font-typing1 mb-2">Encounter</h4>
      <h1 className="text-4xl font-bold font-typing0">Unexpected Error</h1>

      <p className="text-lg mt-4 mb-8">{error?.message}</p>

      <Button variant="contained" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </Cover>
  )
}

export const withErrorBoundary = <T extends object>(Component: FC<T>) => {
  return (props: T) => (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
