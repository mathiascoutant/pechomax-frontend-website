import { ReactNode } from 'react'

interface ContainerProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export default function Container({ footer, header, children }: ContainerProps) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg px-8 py-5 m-10 bg-[#efefef]">
      {header && (
        <div>
          {header} <hr className="border-slate-400 my-5" />
        </div>
      )}
      <div className="flex flex-col grow">{children}</div>
      {footer && (
        <div>
          <hr className="border-slate-400 my-5" />
          {footer}
        </div>
      )}
    </div>
  )
}
