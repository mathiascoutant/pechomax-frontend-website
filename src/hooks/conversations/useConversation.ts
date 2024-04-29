import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Conversation } from '../../types/conversation'

export default function useConversation(id: string) {
  return useQuery<Conversation, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await axios.get<Conversation>(`http://localhost:3000/conversations/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
