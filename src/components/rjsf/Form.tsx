import { Send } from "@mui/icons-material"
import { Button, Tooltip } from "@mui/material"
import RJSFForm, { FormProps, ThemeProps, withTheme } from "@rjsf/core"
import { Theme } from "@rjsf/mui"
import { customizeValidator } from "@rjsf/validator-ajv8"
import deepMerge from "deepmerge"
import { forwardRef } from "react"
import { localizeChineseErrorMessage } from "./errorFormatter"
import AddButton from "./themes/AddButton"
import {
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "./themes/ArrayButtons"
import ArrayFieldItemTemplate from "./themes/ArrayFieldItemTemplate"
import ArrayFieldTemplate from "./themes/ArrayFieldTemplate"
import SelectWidget from "./themes/SelectWidget"
import TitleFieldTemplate from "./themes/TitleFieldTemplate"

// Make modifications to the theme with your own fields and widgets

const ThemedForm = withTheme(
  deepMerge<ThemeProps, ThemeProps>(Theme, {
    widgets: {
      SelectWidget,
    },
    templates: {
      TitleFieldTemplate,
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
      ArrayFieldTemplate,
      ArrayFieldItemTemplate,
      ButtonTemplates: {
        AddButton,
        RemoveButton,
        MoveUpButton,
        MoveDownButton,
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
      experimental_defaultFormStateBehavior={{
        arrayMinItems: {
          populate: "requiredOnly",
        },
      }}
      uiSchema={{ restChoices: { "ui:widget": "CheckboxesWidget" } }}
      {...props}
    />
  )
})
