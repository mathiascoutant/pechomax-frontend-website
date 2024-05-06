import { Link, useLocation } from 'react-router-dom'

interface NavBarItemProps {
  link: string
  children: React.ReactNode
}

export default function NavBarItem({ link, children }: NavBarItemProps) {
  const location = useLocation()

  return (
    <Link
      to={link}
      className={`hover:bg-[#3D424E] ${location.pathname.includes(link) ? 'bg-[#25272c]' : ''} active:bg-[#25272c] text-white w-full px-5 py-2`}
    >
      {children}
    </Link>
  )
}
