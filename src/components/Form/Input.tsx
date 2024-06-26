import { HTMLInputTypeAttribute, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputProps {
  label: string
  type: HTMLInputTypeAttribute
  step?: string
  defaultValue?: string
  children?: React.ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, InputProps & ReturnType<UseFormRegister<Record<string, string>>>>(
  (
    {
      label,
      type,
      name,
      onBlur,
      onChange,
      disabled,
      max,
      maxLength,
      min,
      minLength,
      pattern,
      required,
      defaultValue,
      step,
      children,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="text-gray-700">
          {label} :
          <input
            ref={ref}
            className="border-2 border-black-600 w-full pl-2"
            type={type}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            max={max}
            maxLength={maxLength}
            min={min}
            minLength={minLength}
            pattern={pattern}
            required={required}
            defaultValue={defaultValue}
            step={step}
          />
        </label>
        {children}
      </div>
    )
  }
)
