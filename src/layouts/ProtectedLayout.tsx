import NavBar from '../components/NavBar'
import useJwtLogin from '../hooks/auth/useJwtLogin'
import { Link, Outlet } from 'react-router-dom'

export default function ProtectedLayout() {
  const { isLoading, isError, error, role } = useJwtLogin()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p>Il y a eu une erreur</p>
        <p>{error?.response?.data?.message}</p>
        <Link to="/login" className="text-blue-300">
          S'identifier
        </Link>
      </div>
    )
  }

  if (role !== 'Admin') {
    return <div>Vous n'êtes pas Admin</div>
  }

  return (
    <div className="grid grid-cols-[min-content_1fr] h-full">
      <NavBar />
      <Outlet />
    </div>
  )
}
