import { useQuery } from '@tanstack/react-query'
import { User } from '../types/user'
import { QueryError } from '../types/query'
import axios from 'axios'

type QueryReturn = User[]

export default function useUserList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/users', { withCredentials: true })

      return response.data
    },
  })
}
