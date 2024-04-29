import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Conversation } from '../../types/conversation'

type QueryVariables = Partial<Conversation> & { id: string }

export default function useUpdateConversation() {
  return useMutation<Conversation, QueryError, QueryVariables>({
    mutationKey: ['updateConversation'],
    mutationFn: async (Conversation) => {
      const response = await axios.put(`http://localhost:3000/conversations/update/${Conversation.id}`, Conversation, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
