import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../types/query'

type QueryReturn = string

export default function useLogout() {
  return useMutation<QueryReturn, QueryError>({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/auth/logout', { withCredentials: true })

      return response.data
    },
  })
}
