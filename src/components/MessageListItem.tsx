import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteMessage from '../hooks/messages/useDeleteMessage'

interface MessageListItemProps {
  id: string
  content: string
  darker?: boolean
  links?: boolean
}

export function MessageListItem({ id, content, darker, links = true }: MessageListItemProps) {
  const { mutate, isPending } = useDeleteMessage()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[400px_1fr_min-content_min-content] items-center gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      <span>{id}</span>
      <span className="overflow-ellipsis text-nowrap">{content}</span>
      {links ? (
        <>
          <Link to={`/messages/update/${id}`} aria-disabled={isPending} className="w-min">
            <Button>Details</Button>
          </Link>
          <Button onClick={handleDelete} disabled={isPending} className="w-min">
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
