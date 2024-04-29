import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useDeleteMessage from '../../hooks/messages/useDeleteMessage'
import { Messages } from '../../types/message'
import useMessagesList from '../../hooks/messages/useMessagesList'

function ListMessages() {
  const queryClient = useQueryClient()
  const { data: MessagesList, isError, isSuccess } = useMessagesList()
  const { mutate } = useDeleteMessage()

  const handleMessageDelete = useCallback((messageId: string) => {
    mutate({ id: messageId })

    queryClient.setQueryData(['message-list'], (old: Messages[]) => old.filter((message) => message.id !== messageId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              MessagesList.map((message, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {message.id}</p>
                  <p>Content: {message.content}</p>
                  <a className="text-center" href={`./messages/update/${message.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleMessageDelete(message.id)}>
                    Supprimer
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListMessages

