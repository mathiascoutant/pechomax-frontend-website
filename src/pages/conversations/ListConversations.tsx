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

    queryClient.setQueryData(['conversation-list'], (old: Conversation[]) =>
      old.filter((conversation) => conversation.id !== conversationId)
    )
  }, [])

  return (
    <>
      <div className="w-10 mt-2 ml-2 hover:cursor-pointer ">
        <a href="/conversations/create">
          <img src="/src/assets/images/plus.png" alt="" />
        </a>
      </div>
      <div className="flex flex-cols-2 w-screen p-2">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              conversationList.map((conversation) => (
                <div key={conversation.id} className="grid grid-cols-4 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {conversation.id}</p>
                  <p>Title: {conversation.title}</p>
                  <a
                    className="flex items-center justify-center hover:text-[#1f4f42] hover:bg-[#A7C4E4]"
                    href={`./conversations/update/${conversation.id}`}
                  >
                    <p>Modifier</p>
                  </a>
                  <button
                    className="hover:text-red-700 hover:bg-[#d4f8d7]"
                    onClick={() => handleConversationDelete(conversation.id)}
                  >
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
