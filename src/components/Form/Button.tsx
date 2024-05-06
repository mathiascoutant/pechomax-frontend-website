import { SyntheticEvent } from 'react'

interface ButtonProps {
  submit?: boolean
  disabled?: boolean
  children: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
}

export const Button = function ({ submit, disabled, onClick = () => void 0, children }: ButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className="p-2 bg-[#A7C4E4] hover:bg-[#9bb7d5] active:shadow active:top-[1px] shadow-lg rounded-lg text-center relative"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
