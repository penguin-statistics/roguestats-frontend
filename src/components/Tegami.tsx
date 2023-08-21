import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

export const WhiteRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-40 h-full w-full">
      {children}
      <div className="absolute bottom-12 flex items-center font-typing0 gap-2 select-none">
        <img
          src="https://penguin.upyun.galvincdn.com/logos/penguin_stats_logo.png"
          alt="logo"
          className="h-8"
        />
        <div className="leading-none translate-y-1">
          A Penguin Statistics Project
        </div>
      </div>
    </div>
  )
}

export const Cover: FC<
  PropsWithChildren<{
    underOverlay?: boolean
  }>
> = ({ children, underOverlay }) => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/card.png)`,
        backgroundSize: "cover",
      }}
      className={clsx(
        "aspect-[517/400] h-full bg-right flex justify-end transiton-all",
        {
          "brightness-[25%] pointer-events-none": underOverlay,
        },
      )}
    >
      <div className="aspect-[300/400] h-full select-none">
        <div className="pr-[15%] pt-[12%] p-[10%] h-full relative">
          {children}
        </div>
      </div>
      <div className="aspect-[50/400] h-full select-none"></div>
    </div>
  )
}
