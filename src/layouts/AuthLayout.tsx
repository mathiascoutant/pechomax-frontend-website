import { Link, Outlet } from 'react-router-dom'

export default function () {
  return (
    <div className="bg-[url('/background-login.jpeg')] bg-cover h-screen w-screen flex flex-col justify-center items-center">
      <Link to="/" className="absolute top-5 left-5">
        <img className="w-20" src="/logo.png" alt="Logo Pechomax" />
      </Link>
      <div className="bg-white p-10 flex flex-col justify-center items-center gap-4 rounded-md shadow-lg max-w-80">
        <Outlet />
      </div>
    </div>
  )
}
