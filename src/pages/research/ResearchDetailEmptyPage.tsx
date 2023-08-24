import { Toolbar } from "@mui/material"
import { FC } from "react"
import { EmptyStateCard } from "../../components/Card"

export const ResearchDetailEmptyPage: FC = () => {
  return (
    <EmptyStateCard>
      <Toolbar className="absolute left-0 right-0 top-0 bg-slate-900 text-white py-4 opacity-10 select-none">
        <div className="flex flex-col">
          <h4 className="text-sm leading-none mb-1.5">汇报</h4>
          <h1 className="text-xl leading-none font-bold">课题名称</h1>
        </div>
      </Toolbar>

      <h1 className="text-lg text-slate-700 select-none">暂未选定任何课题</h1>
      <p className="text-slate-500 text-sm select-none">
        于左侧选择一个课题以继续
      </p>
    </EmptyStateCard>
  )
}
