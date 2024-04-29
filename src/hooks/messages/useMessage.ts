import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Messages } from '../../types/message'

export default function useConversation(id: string) {
  return useQuery<Messages, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await axios.get<Messages>(`http://localhost:3000/messages/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
