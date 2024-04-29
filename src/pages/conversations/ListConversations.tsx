import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useConversationList from '../../hooks/conversations/useConversationList'
import { Conversation } from '../../types/conversation'
import useDeleteConversation from '../../hooks/conversations/useDeleteConversation'

function ListConversations() {
  const queryClient = useQueryClient()
  const { data: conversationList, isError, isSuccess } = useConversationList()
  const { mutate } = useDeleteConversation()

  const handleConversationDelete = useCallback((conversationId: string) => {
    mutate({ id: conversationId })

    queryClient.setQueryData(['conversation-list'], (old: Conversation[]) => old.filter((conversation) => conversation.id !== conversationId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              conversationList.map((conversation, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {conversation.id}</p>
                  <p>Title: {conversation.title}</p>
                  <a className="text-center" href={`./conversations/update/${conversation.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleConversationDelete(conversation.id)}>
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

export default ListConversations
