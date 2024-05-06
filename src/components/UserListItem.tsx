import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteUser from '../hooks/users/useDeleteUser'

interface UserListItemProps {
  profilePic: string
  username: string
  email: string
  id: string
  darker?: boolean
  links?: boolean
  img?: boolean
}

export function UserListItem({ email, profilePic, username, darker, id, links = true, img = true }: UserListItemProps) {
  const { mutate, isPending } = useDeleteUser()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[max-content_1fr_1fr_0.5fr_0.5fr] gap-6 items-center justify-items-center ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      {img ? (
        <img src={profilePic} alt={`${username} profile pic`} width={32} className="rounded-full" />
      ) : (
        <div className="w-[32px]"></div>
      )}
      <span>{username}</span>
      <span>{email}</span>
      {links ? (
        <>
          <Link to={`/users/update/${username}`} aria-disabled={isPending}>
            <Button>Details</Button>
          </Link>
          <Button onClick={handleDelete} disabled={isPending}>
            Supprimer
          </Button>
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  )
}
