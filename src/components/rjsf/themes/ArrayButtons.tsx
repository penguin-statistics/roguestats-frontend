import RemoveIcon from "@mui/icons-material/Remove"
import { Button, ButtonProps } from "@mui/material"
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils"

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
    color,
    ...restProps
  } = props

  return (
    <Button
      title={translateString(TranslatableString.MoveDownButton)}
      {...restProps}
      color={color as ButtonProps["color"]}
      startIcon={<ArrowDownwardIcon fontSize="small" />}
    >
      下移
    </Button>
  )
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
    color,
    ...restProps
  } = props
  return (
    <Button
      title={translateString(TranslatableString.MoveUpButton)}
      {...restProps}
      color={color as ButtonProps["color"]}
      startIcon={<ArrowUpwardIcon fontSize="small" />}
    >
      上移
    </Button>
  )
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const { iconType, ...otherProps } = props
  const {
    registry: { translateString },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    style,
    ...rest
  } = otherProps

  return (
    <Button
      title={translateString(TranslatableString.RemoveButton)}
      {...rest}
      color="error"
      startIcon={
        <RemoveIcon fontSize={iconType === "default" ? undefined : "small"} />
      }
      variant="contained"
    >
      删除
    </Button>
  )
}
