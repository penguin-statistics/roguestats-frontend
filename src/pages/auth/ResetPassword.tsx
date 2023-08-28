import {
  CircularProgress,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material"
import clsx from "clsx"
import { FC, useState } from "react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-relay"
import { useNavigate } from "react-router-dom"
import { useSearchParam } from "react-use"
import { graphql } from "relay-runtime"
import { withErrorBoundary } from "../../components/ErrorBoundary"
import { Cover } from "../../components/Tegami"
import { formatError } from "../../utils/friendlyError"
import { ResetPasswordMutation } from "./__generated__/ResetPasswordMutation.graphql"

const StyledTextField = styled(TextField)<TextFieldProps>`
  width: 100%;
  font-family: "Typing0", sans-serif !important;
  & .MuiOutlinedInput-root,
  & .MuiOutlinedInput-input,
  & .MuiInputLabel-root {
    font-family: "Typing0", sans-serif !important;
  }
`

export const ResetPasswordPage: FC = withErrorBoundary(() => {
  const [password, setPassword] = useState<string>("")
  const [commitMutation, loading] = useMutation<ResetPasswordMutation>(graphql`
    mutation ResetPasswordMutation($input: ResetPasswordInput!) {
      resetPassword(input: $input)
    }
  `)
  const navigate = useNavigate()

  const token = useSearchParam("token")
  if (!token)
    throw new Error(
      "重置登录信息：初始化失败：未找到 token 参数。请重新尝试从邮件中打开重置链接；如果问题仍然存在，请联系开发组。",
    )

  const handleLogin = () => {
    commitMutation({
      variables: {
        input: {
          token,
          password,
        },
      },
      onCompleted: () => {
        toast.success(
          `登录信息重置成功，您无须再次登录即可继续使用 RogueStats，但在您下次登录时，您将需要使用新的密码。`,
        )
        navigate("/")
      },
      onError: error => {
        console.debug(error)
        toast.error(`登录信息重置失败：${formatError(error)}`)
      },
    })
  }

  return (
    <>
      <Cover underOverlay={loading}>
        <h4 className="text-xl font-typing1 mb-2">RogueStats</h4>
        <h1 className="text-4xl font-bold font-typing0 mb-4">Reset Password</h1>

        <form
          className="flex flex-col gap-4 font-typing0"
          onSubmit={e => {
            e.preventDefault()
          }}
          action=""
        >
          <StyledTextField
            label="New Password"
            variant="outlined"
            autoComplete="new-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={clsx(
              "absolute bottom-12 left-[14%] right-0 w-[50%] h-24 flex items-center text-left pl-12 font-typing0",
              "text-2xl hover:after:content-['>>>'] hover:opacity-70 hover:underline active:after:content-['>>>>'] active:opacity-100 active:underline",
            )}
            onClick={handleLogin}
          >
            Reset Password
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
})
