import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface SelectProps {
  label: string
  options: { key: string; value: string }[]
  defaultValue: string
  children?: React.ReactNode
}

export const FormSelect = forwardRef<
  HTMLSelectElement,
  SelectProps & ReturnType<UseFormRegister<Record<string, string>>>
>(({ label, name, options, onBlur, onChange, defaultValue, disabled, required, children }, ref) => {
  return (
    <div className="w-full">
      <label className="text-gray-700">
        {label} :
        <select
          ref={ref}
          className="border-2 border-black-600 w-full pl-2"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          <option value="">{defaultValue}</option>
          {options.map((o) => (
            <option value={o.value} key={o.value}>
              {o.key}
            </option>
          ))}
        </select>
      </label>
      {children}
    </div>
  )
})
