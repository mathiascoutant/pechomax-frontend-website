import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Messages } from '../../types/message'

type QueryReturn = Messages[]

export default function useMessageList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['message-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/messages?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
