import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = User[]

export default function useUserList(page: number = 0) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['user-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/users?page=${page ?? 0}`, { withCredentials: true })

      return response.data
    },
  })
}
