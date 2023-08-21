import { createBrowserRouter } from "react-router-dom"
import { NotFoundPage } from "./pages/404"
import { Dashboard } from "./pages/Dashboard"
import { HomePage } from "./pages/Home"
import { LoginPage } from "./pages/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
