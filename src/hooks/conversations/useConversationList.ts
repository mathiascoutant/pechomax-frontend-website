import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Conversation } from '../../types/conversation'

type QueryReturn = Conversation[]

export default function useConversationList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['conversation-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`conversations?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
