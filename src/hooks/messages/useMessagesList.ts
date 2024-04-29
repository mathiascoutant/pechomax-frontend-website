import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Messages } from '../../types/message'

type QueryReturn = Messages[]

export default function useConversationList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['message-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/messages', { withCredentials: true })

      return response.data
    },
  })
}
