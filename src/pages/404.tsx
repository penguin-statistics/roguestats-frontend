import { FC } from "react"
import { Cover, WhiteRootLayout } from "../components/Tegami"

export const NotFoundPage: FC = () => {
  return (
    <WhiteRootLayout>
      <Cover>
        <h4 className="text-xl font-typing1 mb-2">Not Found</h4>
        <h1 className="text-4xl font-bold font-typing0">404</h1>
      </Cover>
    </WhiteRootLayout>
  )
}
