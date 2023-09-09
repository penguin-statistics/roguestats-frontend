import clsx from "clsx"
import { FC, ReactNode } from "react"
import MdiNumeric0Box from "~icons/mdi/numeric-0-box"
import MdiNumeric1Box from "~icons/mdi/numeric-1-box"
import MdiNumeric2Box from "~icons/mdi/numeric-2-box"
import MdiNumeric3Box from "~icons/mdi/numeric-3-box"
import MdiNumeric4Box from "~icons/mdi/numeric-4-box"
import MdiNumeric5Box from "~icons/mdi/numeric-5-box"
import MdiNumeric6Box from "~icons/mdi/numeric-6-box"
import MdiNumeric7Box from "~icons/mdi/numeric-7-box"
import MdiNumeric8Box from "~icons/mdi/numeric-8-box"
import MdiNumeric9Box from "~icons/mdi/numeric-9-box"

const NUMBER_ICON_MAP: Record<number, ReactNode> = {
  0: <MdiNumeric0Box className="h-6 w-6" />,
  1: <MdiNumeric1Box className="h-6 w-6" />,
  2: <MdiNumeric2Box className="h-6 w-6" />,
  3: <MdiNumeric3Box className="h-6 w-6" />,
  4: <MdiNumeric4Box className="h-6 w-6" />,
  5: <MdiNumeric5Box className="h-6 w-6" />,
  6: <MdiNumeric6Box className="h-6 w-6" />,
  7: <MdiNumeric7Box className="h-6 w-6" />,
  8: <MdiNumeric8Box className="h-6 w-6" />,
  9: <MdiNumeric9Box className="h-6 w-6" />,
}
export const DiscoverQueryEditorStep: FC<{
  index: number
  title: ReactNode
  disabled?: boolean
  children?: ReactNode
}> = ({ index, title, disabled, children }) => {
  return (
    <div className="transition flex gap-4 group">
      <h2
        className={clsx(
          "text-lg font-bold flex items-center gap-2 transition select-none",
          disabled && "opacity-50 group-hover:opacity-90",
          disabled ? "text-slate-500" : "text-slate-600",
        )}
      >
        <div>{NUMBER_ICON_MAP[index]}</div>
        <div>{title}</div>
      </h2>

      <div className="w-[1px] h-full bg-slate-300" />

      <div
        className={clsx(
          "flex-1",
          disabled && "opacity-50 pointer-events-none select-none",
        )}
      >
        {children}
      </div>
    </div>
  )
}
