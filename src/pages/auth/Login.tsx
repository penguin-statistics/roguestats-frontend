import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile"
import {
  CircularProgress,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material"
import clsx from "clsx"
import { FC, useCallback, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-relay"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffectOnce, useUnmount } from "react-use"
import { graphql } from "relay-runtime"
import { Cover } from "../../components/Tegami"
import { formatError } from "../../utils/friendlyError"
import { getToken } from "../../utils/storage"
import { LoginMutation } from "./__generated__/LoginMutation.graphql"

const StyledTextField = styled(TextField)<TextFieldProps>`
  width: 100%;
  font-family: "Typing0", sans-serif !important;
  & .MuiOutlinedInput-root,
  & .MuiOutlinedInput-input,
  & .MuiInputLabel-root {
    font-family: "Typing0", sans-serif !important;
  }
`

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [turnstileResponse, setTurnstileResponse] = useState<string>()
  const [searchParams] = useSearchParams()
  const [commitMutation, loading] = useMutation<LoginMutation>(graphql`
    mutation LoginMutation($input: LoginInput!) {
      login(input: $input) {
        id
        name
        email
        attributes
      }
    }
  `)
  const turnstileRef = useRef<TurnstileInstance>()
  const navigate = useNavigate()

  const navigateToRedirect = useCallback(() => {
    const redirect = searchParams.get("redirect")
    if (redirect) {
      navigate(redirect)
    } else {
      navigate("/research")
    }
  }, [navigate, searchParams])

  useEffectOnce(() => {
    if (getToken()) {
      navigateToRedirect()
    } else if (searchParams.get("reason")) {
      const reason = searchParams.get("reason")
      if (reason === "TOKEN_EXPIRED") {
        toast.error("登录已过期，请重新登录")
      }
    }
  })

  useUnmount(() => {
    turnstileRef.current?.remove()
  })

  const handleLogin = () => {
    if (!turnstileResponse) {
      toast.error(
        "人机验证仍在进行中，请稍等片刻。如果长时间未响应，请刷新页面重试。",
      )
      return
    }

    commitMutation({
      variables: {
        input: {
          email,
          password,
          turnstileResponse,
        },
      },
      onCompleted: data => {
        toast.success(`已登录为 ${data.login.name}`)
        navigate("/research")
      },
      onError: error => {
        console.debug(error)
        toast.error(`登录失败：${formatError(error)}`)
        turnstileRef.current?.reset()
        setTurnstileResponse(undefined)
      },
    })
  }

  return (
    <>
      <Cover underOverlay={loading}>
        <h4 className="text-xl font-typing1 mb-2">RogueStats</h4>
        <h1 className="text-4xl font-bold font-typing0 mb-4">
          &gt;&gt;&gt;Authentication
        </h1>

        <form
          className="flex flex-col gap-4 font-typing0"
          onSubmit={e => {
            e.preventDefault()
          }}
          action=""
        >
          <StyledTextField
            label="E-mail"
            variant="outlined"
            autoComplete="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Turnstile
            ref={turnstileRef}
            siteKey="0x4AAAAAAAI_htC0Nx9f7D66"
            onSuccess={token => setTurnstileResponse(token)}
            onError={() => toast.error("人机验证失败，请刷新页面并重试")}
            options={{
              action: "login",
              theme: "dark",
              size: "invisible",
              tabIndex: -1,
            }}
          />

          <button
            type="submit"
            className={clsx(
              "absolute bottom-12 left-[14%] right-0 w-[50%] h-24 flex items-center text-left pl-12 font-typing0",
              turnstileResponse
                ? "text-2xl hover:after:content-['>>>'] hover:opacity-70 hover:underline active:after:content-['>>>>'] active:opacity-100 active:underline"
                : "text-lg cursor-wait opacity-40",
            )}
            onClick={handleLogin}
            disabled={!turnstileResponse}
          >
            {turnstileResponse ? "Login" : "Waiting for CAPTCHA response..."}
          </button>
        </form>
      </Cover>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  )
}
