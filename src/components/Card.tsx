import { Card } from "@mui/material"
import { FC, PropsWithChildren } from "react"

export const EmptyStateCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      className="p-4 shadow-lg min-h-[40rem] h-full flex flex-col gap-2 items-center justify-center relative"
      key="empty"
    >
      {children}
    </Card>
  )
}
