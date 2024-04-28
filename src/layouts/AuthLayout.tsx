import Header from '../components/Header'
import NavBar from '../components/NavBar'
import useJwtLogin from '../hooks/auth/useJwtLogin'
import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const { isLoading, isError, error } = useJwtLogin()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        <p>There has been an error</p>
        <p>{error?.response?.data?.message}</p>
        <Link to="/login" className="text-blue-300">
          got to login
        </Link>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-cols-2 w-full">
        <NavBar />
        <Outlet />
      </div>
    </>
  )
}
