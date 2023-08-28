import { createBrowserRouter } from "react-router-dom"
import { AuthLayout } from "./layouts/AuthLayout"
import { RootLayout } from "./layouts/RootLayout"
import { NotFoundPage } from "./pages/404"
import { LoginPage } from "./pages/auth/Login"
import { RequestPasswordResetPage } from "./pages/auth/RequestPasswordReset"
import { ResetPasswordPage } from "./pages/auth/ResetPassword"
import { ResearchDetailEmptyPage } from "./pages/research/ResearchDetailEmptyPage"
import { ResearchDetailPage } from "./pages/research/ResearchDetailPage"
import { ResearchIndexPage } from "./pages/research/ResearchIndexPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/research",
        element: <ResearchIndexPage />,
        children: [
          {
            path: "",
            element: <ResearchDetailEmptyPage />,
          },
          {
            path: ":id",
            element: <ResearchDetailPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "request-password-reset",
        element: <RequestPasswordResetPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
