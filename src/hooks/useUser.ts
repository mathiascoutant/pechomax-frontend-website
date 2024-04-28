import { useQuery } from '@tanstack/react-query'
import { User } from '../types/user'
import { QueryError } from '../types/query'
import axios from 'axios'

export default function useUser(username: string) {
  return useQuery<User, QueryError>({
    queryKey: ['user', username],
    queryFn: async () => {
      const response = await axios.get<User>(`http://localhost:3000/users/${username}`, { withCredentials: true })

      return response.data
    },
  })
}
