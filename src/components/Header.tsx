import { Link, Navigate } from 'react-router-dom'
import { useUserStore } from '../stores/UserStore'
import useLogout from '../hooks/auth/useLogout'
import { SyntheticEvent, useCallback } from 'react'

export default function Header() {
  const { username, setUsername } = useUserStore()
  const { mutate, isPending, isSuccess, isError } = useLogout()

  const handleLogout = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate()
  }, [])

  if (isSuccess) {
    setUsername(null)

    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="grid grid-cols-2 h-20 w-full p-0 bg-slate-200 relative">
        <Link to="/">
          <img className="w-20" src="/src/assets/images/logo.png" alt="" />
        </Link>
        <div className="grid grid-cols-2 w-50">
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          <Link className="right-44 top-7 w-fit absolute" to={username ? `/user/update/${username}` : '/'}>
            {username && <p>{username}</p>}
          </Link>
          <form onSubmit={handleLogout}>
            <button className="right-6 top-7 w-fit absolute" disabled={isPending}>
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
