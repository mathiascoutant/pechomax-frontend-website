import { Link } from "react-router-dom"

interface NavBarItemProps {
  link: string
  children: React.ReactNode
}

export default function NavBarItem({ link, children }: NavBarItemProps) {
  return (
    <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
      <Link to={link}>{children}</Link>
    </div>
  )
}