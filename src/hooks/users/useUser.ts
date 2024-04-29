import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

export default function useUser(username: string) {
  return useQuery<User, QueryError>({
    queryKey: ['user', username],
    queryFn: async () => {
      const response = await AxosClient.get<User>(`/users/${username}`, { withCredentials: true })

      return response.data
    },
  })
}
