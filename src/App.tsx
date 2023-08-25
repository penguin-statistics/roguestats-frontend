import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { RelayEnvironmentProvider } from "react-relay"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { RelayEnvironment } from "./services/relay"
import { store } from "./store"

const theme = createTheme({
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: {
      main: "#000000",
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Toaster
            toastOptions={{
              className: "rounded-none bg-white font-bold pl-3 pr-1 py-2",
              duration: 5e3,
              error: {
                duration: 10e3,
              },
            }}
          />
          <RouterProvider router={router} />
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
