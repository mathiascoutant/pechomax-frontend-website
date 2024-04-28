import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../types/query'

type ReturnData = string

export default function useLogout() {
  return useMutation<ReturnData, QueryError>({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.get<ReturnData>('http://localhost:3000/auth/logout', { withCredentials: true })

      return response.data
    },
  })
}
