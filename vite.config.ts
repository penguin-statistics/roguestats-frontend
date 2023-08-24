import { sentryVitePlugin } from "@sentry/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, splitVendorChunkPlugin } from "vite"
import relay from "vite-plugin-relay"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    relay,
    react({
      babel: {
        plugins: ["babel-plugin-relay"],
      },
    }),
    sentryVitePlugin({
      org: "penguin-statistics",
      project: "roguestats-frontend",
      disable: mode !== "production",
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          core: [
            "react",
            "react-dom",
            "react-relay",
            "react-router-dom",
            "react-use",
            "relay-runtime",
            "react-hot-toast",
            "@rjsf/core",
          ],
        },
      },
    },
  },
}))
