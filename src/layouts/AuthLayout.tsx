import { FC } from "react"
import { Outlet } from "react-router-dom"
import { WhiteRootLayout } from "../components/Tegami"

export const AuthLayout: FC = () => {
  return (
    <WhiteRootLayout>
      <Outlet />
    </WhiteRootLayout>
  )
}
