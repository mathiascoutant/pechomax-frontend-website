import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Conversation } from '../../types/conversation'

export default function useConversation(id: string) {
  return useQuery<Conversation, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Conversation>(`/conversations/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
