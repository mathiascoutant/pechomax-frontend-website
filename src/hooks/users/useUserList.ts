import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = User[]

export default function useUserList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/users', { withCredentials: true })

      return response.data
    },
  })
}
