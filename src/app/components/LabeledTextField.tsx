import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  type?: "text" | "password" | "email" | "number" | "checkbox"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <label {...labelProps} className="my-1">
          {label}
          <input
            disabled={isSubmitting}
            {...register(name)}
            {...props}
            className={
              props.type !== "checkbox"
                ? "appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                : ""
            }
          />
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" className="my-1 text-red-700">
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input[type="text"],
          input[type="password"],
          input[type="email"],
          input[type="number"] {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
          input[type="radio"],
          input[type="checkbox"] {
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
