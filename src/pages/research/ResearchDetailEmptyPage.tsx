import { FC } from "react"
import { EmptyStateCard } from "../../components/Card"

export const ResearchDetailEmptyPage: FC = () => {
  return (
    <EmptyStateCard>
      <h1 className="text-lg text-slate-700 select-none">暂未选定任何课题</h1>
      <p className="text-slate-500 text-sm select-none">
        于左侧选择一个课题以继续
      </p>
    </EmptyStateCard>
  )
}
