import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

export const Footer: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex items-center font-typing0 gap-2 select-none",
        className,
      )}
    >
      <img
        src="https://penguin.upyun.galvincdn.com/logos/penguin_stats_logo.png"
        alt="logo"
        className="h-8"
      />
      <div className="leading-none translate-y-1">
        A Penguin Statistics Project
      </div>
    </div>
  )
}

export const WhiteRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-40 h-full w-full flex justify-center items-center">
      {children}
      <Footer className="absolute bottom-12" />
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

        // Magic number by measuring the actual element size of 1920x1080 screen
        height: 760,
        width: 982.3,
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
