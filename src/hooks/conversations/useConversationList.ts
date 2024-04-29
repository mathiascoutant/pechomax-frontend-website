import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Conversation } from '../../types/conversation'

type QueryReturn = Conversation[]

export default function useConversationList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['conversation-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/conversations', { withCredentials: true })

      return response.data
    },
  })
}
