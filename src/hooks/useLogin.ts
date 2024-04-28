import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../types/query'
import Payload from '../types/payload'
interface VariablesData {
  credential: string
  password: string
}

export default function useLogin() {
  return useMutation<Payload, QueryError, VariablesData>({
    mutationKey: ['login'],
    mutationFn: async (postData) => {
      const response = await axios.post<Payload>('http://localhost:3000/auth/login', postData, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
