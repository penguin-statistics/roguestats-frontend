import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { NotFoundPage } from "./pages/404"
import { LoginPage } from "./pages/Login"
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
            path: "/research/:id",
            element: <ResearchDetailPage />,
          },
        ],
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
