import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteLocation from '../hooks/locations/useDeleteLocation'

interface LocationListItemProps {
  name: string
  id: string
  longitude: string
  latitude: string
  darker?: boolean
  links?: boolean
}

export function LocationListItem({ name, latitude, longitude, darker, id, links = true }: LocationListItemProps) {
  const { mutate, isPending } = useDeleteLocation()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[400px_200px_200px_1fr_min-content_min-content] items-center gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      <span>{id}</span>
      <span>{name}</span>
      <span>{longitude}</span>
      <span>{latitude}</span>
      {links ? (
        <>
          <Link to={`/locations/update/${id}`} aria-disabled={isPending} className="w-min">
            <Button>Details</Button>
          </Link>
          <Button onClick={handleDelete} disabled={isPending} className="w-min none">
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
