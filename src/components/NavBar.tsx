import { SyntheticEvent, useCallback } from 'react'
import useLogout from '../hooks/auth/useLogout'
import { useUserStore } from '../stores/UserStore'
import NavBarItem from './NavBarItem'
import { Link, Navigate } from 'react-router-dom'
import { Button } from './Form/Button'

export default function NavBar() {
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
    <>
      <div className="bg-[#323640] h-full">
        <div className="grid grid-rows-[1fr_7fr_1fr] justify-center h-full">
          <Link to="/" className="flex justify-center items-center">
            <img className="w-20" src="/src/assets/images/logo.png" alt="" />
          </Link>
          <div className="flex flex-col gap-4 items-center pt-5">
            <NavBarItem link="/users">Utilisateurs</NavBarItem>
            <NavBarItem link="/catches">Prises</NavBarItem>
            <NavBarItem link="/conversations">Conversations</NavBarItem>
            <NavBarItem link="/categories">Catégories</NavBarItem>
            <NavBarItem link="/messages">Messages</NavBarItem>
            <NavBarItem link="/locations">Locations</NavBarItem>
            <NavBarItem link="/species">Species</NavBarItem>
            <NavBarItem link="/levels">Levels</NavBarItem>
          </div>
          <div className="flex flex-col items-center gap-4">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            <span className="text-white">{username}</span>
            <Button disabled={isPending} onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
