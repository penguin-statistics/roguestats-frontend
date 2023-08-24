import { AccountCircle } from "@mui/icons-material"
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { FC, useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffectOnce } from "react-use"
import { getToken } from "../utils/storage"
import { RootLayoutQuery } from "./__generated__/RootLayoutQuery.graphql"

export const RootLayout: FC = () => {
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
        <Toolbar className="flex items-center gap-4">
          <img
            src="https://penguin.upyun.galvincdn.com/logos/penguin_stats_logo.png"
            alt="logo"
            className="h-8"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>RogueStats</div>
          </Typography>
          <AccountButton />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className="pt-16">
        <Outlet />
      </Container>
    </>
  )
}

const AccountButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const data = useLazyLoadQuery<RootLayoutQuery>(
    graphql`
      query RootLayoutQuery {
        me {
          name
        }
      }
    `,

    {},
    { fetchPolicy: "store-or-network" },
  )

  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

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
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "account-menu-",
          className: "min-w-[200px]",
        }}
      >
        <div className="flex flex-col gap-2 p-4">
          <div className="text-lg font-bold">{data.me.name}</div>
        </div>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}
