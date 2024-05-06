import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteConversation from '../hooks/conversations/useDeleteConversation'

interface ConversationListItemProps {
  title: string
  id: string
  darker?: boolean
  links?: boolean
}

export function ConversationListItem({ title, darker, id, links = true }: ConversationListItemProps) {
  const { mutate, isPending } = useDeleteConversation()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div
      className={`w-full grid grid-cols-[400px_1fr_min-content_min-content] items-center gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}
    >
      <span>{id}</span>
      <span>{title}</span>
      {links ? (
        <>
          <Link to={`/conversations/update/${id}`} aria-disabled={isPending} className="w-min">
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
