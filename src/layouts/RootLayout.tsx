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
import { FC, Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "react-hot-toast"
import { graphql, useLazyLoadQuery } from "react-relay"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
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
    if (
      token &&
      (location.pathname === "/" || location.pathname === "/auth/login")
    ) {
      navigate("/research")
    } else if (!token) {
      navigate("/auth/login")
    }
  })

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="flex flex-col justify-around py-2 h-16">
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

          {/* <NavigationBar /> */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="pt-[5.5rem] pb-24 h-full">
        <Outlet />

        <div className="w-full flex items-center justify-center py-[4rem]">
          <Footer />
        </div>
      </Container>
    </>
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
