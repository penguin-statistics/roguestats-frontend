import { Send } from "@mui/icons-material"
import { Button, Tooltip } from "@mui/material"
import RJSFForm, { FormProps, ThemeProps, withTheme } from "@rjsf/core"
import { Theme } from "@rjsf/mui"
import { customizeValidator } from "@rjsf/validator-ajv8"
import { merge } from "lodash-es"
import { forwardRef } from "react"
import SelectWidget from "./SelectWidget"
import { localizeChineseErrorMessage } from "./errorFormatter"

// Make modifications to the theme with your own fields and widgets

const ThemedForm = withTheme(
  merge<ThemeProps, ThemeProps>(Theme, {
    widgets: {
      SelectWidget,
    },
    templates: {
      ErrorListTemplate: ({ errors }) => {
        return (
          <div className="bg-red-100 p-4 my-2 shadow">
            <h4 className="font-bold text-lg">有些内容看起来不太对...</h4>
            <ul className="list-disc pl-4 mt-1">
              {errors.map((error, i) => (
                <Tooltip
                  title={
                    <div className="whitespace-pre-wrap font-mono">
                      {JSON.stringify(error, null, 2)}
                    </div>
                  }
                  key={i}
                  placement="bottom-start"
                >
                  <li className="cursor-help">{error.stack}</li>
                </Tooltip>
              ))}
            </ul>
          </div>
        )
      },
      ButtonTemplates: {
        SubmitButton: ({ uiSchema }) => {
          return (
            <Button
              type="submit"
              size="large"
              startIcon={<Send />}
              variant="contained"
              className="px-6 py-2"
              disabled={uiSchema?.["ui:disabled"]}
            >
              提交
            </Button>
          )
        },
      },
    },
  }),
)

const validator = customizeValidator({}, localizeChineseErrorMessage)

export const Form = forwardRef<
  RJSFForm,
  Omit<FormProps, "validator" | "liveValidate">
>(function Form(props, ref) {
  return (
    <ThemedForm
      ref={ref}
      liveValidate
      validator={validator}
      noHtml5Validate
      showErrorList="bottom"
      uiSchema={{ restChoices: { "ui:widget": "CheckboxesWidget" } }}
      {...props}
    />
  )
})
