import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteLevels from '../hooks/levels/useDeleteLevels'

interface LevelListItemProps {
  id: string
  title: string
  value: number | string
  start: number | string
  end?: number | string
  darker?: boolean
  links?: boolean
}

export function LevelListItem({ id, title, value, start, end, darker, links = true }: LevelListItemProps) {
  const { mutate, isPending } = useDeleteLevels()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[200px_200px_200px_1fr_min-content_min-content] items-center gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      <span>{title}</span>
      <span>{value}</span>
      <span>{start}</span>
      <span>{end ? end : '∞'}</span>
      {links ? (
        <>
          <Link to={`/levels/update/${id}`} aria-disabled={isPending} className="w-min">
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
