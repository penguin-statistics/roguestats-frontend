import { Typography } from "@mui/material"
import clsx from "clsx"
import { FC } from "react"
import { Link, useMatches } from "react-router-dom"

const navigatableRoutes = [
  {
    path: "/research",
    label: "提交数据",
  },
  {
    path: "/discover",
    label: "数据查询",
  },
]

export const NavigationBar: FC = () => {
  const matches = useMatches()
  return (
    <div className="flex items-center justify-start gap-2 w-full">
      {navigatableRoutes.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={clsx(
            "px-2 py-1 transition rounded",
            matches.some(match => match.pathname === path)
              ? "bg-slate-800 text-white"
              : "text-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-900",
          )}
        >
          <Typography variant="body1" component="div">
            {label}
          </Typography>
        </Link>
      ))}
    </div>
  )
}
