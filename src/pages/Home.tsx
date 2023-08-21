import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useEffectOnce } from "react-use"
import { getToken } from "../utils/storage"

export const HomePage: FC = () => {
  const navigate = useNavigate()
  useEffectOnce(() => {
    const token = getToken()
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/auth/login")
    }
  })

  return null
}
