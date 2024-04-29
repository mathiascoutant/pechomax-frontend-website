import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Messages } from '../../types/message'

type QueryReturn = Messages[]

export default function useConversationList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['message-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/messages', { withCredentials: true })

      return response.data
    },
  })
}
