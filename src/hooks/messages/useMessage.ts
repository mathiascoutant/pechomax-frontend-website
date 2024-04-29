import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Messages } from '../../types/message'

export default function useConversation(id: string) {
  return useQuery<Messages, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Messages>(`/messages/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
