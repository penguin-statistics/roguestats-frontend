import { useLocalStorage } from "react-use"

const formatLocalStorageKey = (key: string) => `penguin-roguestats-${key}`

export const LOCALSTORAGE_KEYS = {
  TOKEN: formatLocalStorageKey("token"),
}

export const useToken = () => {
  return useLocalStorage<string>(LOCALSTORAGE_KEYS.TOKEN, undefined, {
    raw: true,
  })
}

export const getToken = () => {
  return localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN)
}

export const setToken = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, token)
}
