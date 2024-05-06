import { Link, Navigate } from 'react-router-dom'
import { useUserStore } from '../stores/UserStore'
import useLogout from '../hooks/auth/useLogout'
import { SyntheticEvent, useCallback } from 'react'
import { Button } from './Form/Button'

export default function Header() {
  const { username, setUsername } = useUserStore()
  const { mutate, isPending, isSuccess, isError } = useLogout()

  const handleLogout = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    mutate()
  }, [])

  if (isSuccess) {
    setUsername(null)

    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="flex justify-between w-full px-5 py-2 bg-slate-200 relative">
        <Link to="/">
          <img className="w-20" src="/src/assets/images/logo.png" alt="" />
        </Link>
        <div className="flex items-center gap-4">
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          <span>{username && <p>{username}</p>}</span>
          <Button disabled={isPending} onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  )
}
