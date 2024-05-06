interface ButtonProps {
  submit?: boolean
  disabled?: boolean
  children: string
}

export const Button = function ({ submit, disabled, children }: ButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className="p-2 bg-[#A7C4E4] hover:bg-[#88a1bd] focus:bg-[#6a7e94]  rounded-lg"
    >
      {children}
    </button>
  )
}
