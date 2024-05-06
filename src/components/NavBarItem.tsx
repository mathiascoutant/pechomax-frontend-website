import { Link } from 'react-router-dom'

interface NavBarItemProps {
  link: string
  children: React.ReactNode
}

export default function NavBarItem({ link, children }: NavBarItemProps) {
  return (
    <Link
      to={link}
      className={`hover:bg-[#3D424E] ${window.location.href.includes(link) ? 'bg-[#25272c]' : ''} text-white w-full px-5 py-2`}
    >
      {children}
    </Link>
  )
}
