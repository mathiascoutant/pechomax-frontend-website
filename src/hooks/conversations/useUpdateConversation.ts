import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Conversation } from '../../types/conversation'

type QueryVariables = Partial<Conversation> & { id: string }

export default function useUpdateConversation() {
  return useMutation<Conversation, QueryError, QueryVariables>({
    mutationKey: ['updateConversation'],
    mutationFn: async (Conversation) => {
      const response = await AxosClient.put(`/conversations/update/${Conversation.id}`, Conversation, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
