import { AccountCircle, Logout, Password } from "@mui/icons-material"
import {
  AppBar,
  CircularProgress,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import clsx from "clsx"
import { FC, Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "react-hot-toast"
import { graphql, useLazyLoadQuery } from "react-relay"
import {
  Link,
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom"
import { useEffectOnce } from "react-use"
import { Footer } from "../components/Tegami"
import { envBuildCommit } from "../utils/env"
import { getToken, setToken, useToken } from "../utils/storage"
import { RootLayoutQuery } from "./__generated__/RootLayoutQuery.graphql"

export const RootLayout: FC = () => {
  const [token] = useToken()
  const navigate = useNavigate()
  const location = useLocation()
  useEffectOnce(() => {
    const token = getToken()
    if (token && location.pathname === "/auth/login") {
      navigate("/research")
    } else if (!token) {
      navigate("/auth/login")
    }
  })

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="flex flex-col justify-around py-2 h-24">
          <div className="flex items-center gap-2 w-full">
            <img
              src="https://penguin.upyun.galvincdn.com/logos/penguin_stats_logo.png"
              alt="logo"
              className="h-8 mr-2"
            />
            <Typography variant="h6" component="div" className="select-none">
              RogueStats
              <span className="font-light">&nbsp;Console</span>
            </Typography>
            <Tooltip
              title="构建版本"
              arrow
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-1 cursor-help font-mono"
            >
              <div>{envBuildCommit || "未知构建"}</div>
            </Tooltip>
            <div className="flex-1" />
            <ErrorBoundary FallbackComponent={() => <></>}>
              <Suspense
                fallback={
                  <CircularProgress
                    color="inherit"
                    size={24}
                    className="mr-3"
                  />
                }
              >
                {token && <AccountButton />}
              </Suspense>
            </ErrorBoundary>
          </div>

          <NavigationBar />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="pt-[7.5rem] pb-24 h-full">
        <Outlet />

        <div className="w-full flex items-center justify-center py-[4rem]">
          <Footer />
        </div>
      </Container>
    </>
  )
}

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

const NavigationBar: FC = () => {
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

const AccountButton: FC = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const data = useLazyLoadQuery<RootLayoutQuery>(
    graphql`
      query RootLayoutQuery {
        me {
          id
          email
          name
        }
      }
    `,

    {},
    { fetchPolicy: "store-or-network" },
  )

  const open = Boolean(anchorEl)

  return (
    <>
      <Tooltip title="账户" arrow>
        <IconButton
          size="medium"
          aria-controls={open ? "account-menu-" : undefined}
          aria-haspopup="true"
          aria-label="account of current user"
          aria-expanded={open ? "true" : undefined}
          color="inherit"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "account-menu",
          className: "min-w-[200px]",
        }}
      >
        <div className="flex flex-col gap-2 px-4 mb-2 mt-1">
          <div className="text-lg font-bold">{data.me?.name}</div>
          <div className="text-xs text-slate-500">
            您的用户 ID: <span className="font-mono">{data.me?.id}</span>
          </div>
          <div className="text-xs text-slate-500">
            若需要更改账户其他信息，烦请联系开发组
          </div>
        </div>

        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            navigate("/auth/request-password-reset")
          }}
        >
          <ListItemIcon>
            <Password />
          </ListItemIcon>
          <div className="flex-1">修改密码</div>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setToken("")
            setAnchorEl(null)
            navigate("/auth/login")
            toast.success("已登出")
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <div className="flex-1">登出</div>
        </MenuItem>
      </Menu>
    </>
  )
}
