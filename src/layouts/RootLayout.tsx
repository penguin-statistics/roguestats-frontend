import { AccountCircle, Logout } from "@mui/icons-material"
import {
  AppBar,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { FC, useState } from "react"
import { toast } from "react-hot-toast"
import { graphql, useLazyLoadQuery } from "react-relay"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffectOnce } from "react-use"
import { getToken, setToken, useToken } from "../utils/storage"
import { RootLayoutQuery } from "./__generated__/RootLayoutQuery.graphql"

export const RootLayout: FC = () => {
  const [token] = useToken()
  const navigate = useNavigate()
  useEffectOnce(() => {
    const token = getToken()
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/auth/login")
    }
  })

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="flex items-center gap-2">
          <img
            src="https://penguin.upyun.galvincdn.com/logos/penguin_stats_logo.png"
            alt="logo"
            className="h-8 mr-2"
          />
          <Typography variant="h6" component="div">
            RogueStats
          </Typography>
          <Tooltip title="构建版本" arrow>
            <div className="bg-slate-800 text-white text-xs px-2 py-1 cursor-help">
              {import.meta.env.VITE_BUILD_GIT_COMMIT || "未知构建"}
            </div>
          </Tooltip>
          <div className="flex-1" />
          {token && <AccountButton />}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className="pt-16">
        <Outlet />
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
      <Tooltip title="Account">
        <IconButton
          size="large"
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
          <div className="text-lg font-bold">{data.me.name}</div>
          <div className="text-xs text-slate-500">
            您的用户 ID: {data.me.id}
          </div>
          <div className="text-xs text-slate-500">
            若需要更改账户信息，烦请联系开发组
          </div>
        </div>
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
