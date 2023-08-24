import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime"
import { getToken, setToken } from "../utils/storage"

const fetchRelay: FetchFunction = async (params, variables) => {
  console.debug("Relay request", params, variables)
  const response = await fetch(
    (import.meta.env.VITE_API_URL || "") + "/graphql",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(getToken() && { authorization: `Bearer ${getToken()}` }),
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    },
  )

  const newToken = response.headers.get("x-penguin-roguestats-set-token")
  if (newToken) setToken(newToken)

  // Get the response as JSON
  return await response.json()
}

// Export a singleton instance of Relay Environment configured with our network function:
export const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
})
