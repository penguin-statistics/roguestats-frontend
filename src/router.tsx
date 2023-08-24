import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { NotFoundPage } from "./pages/404"
import { Dashboard } from "./pages/Dashboard"
import { LoginPage } from "./pages/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
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
