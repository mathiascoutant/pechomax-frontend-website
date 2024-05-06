import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteCatches from '../hooks/catches/useDeleteCatches'

interface CatchesListItemProps {
  length: number | string
  weight: number | string
  pointValue: number | string
  id: string
  darker?: boolean
  links?: boolean
}

export function CatchesListItem({ length, pointValue, weight, darker, id, links = true }: CatchesListItemProps) {
  const { mutate, isPending } = useDeleteCatches()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[400px_100px_100px_1fr_min-content_min-content] items-center gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      <span>{id}</span>
      <span>{length}</span>
      <span>{weight}</span>
      <span>{pointValue}</span>
      {links ? (
        <>
          <Link to={`/catches/update/${id}`} aria-disabled={isPending} className="w-min">
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
