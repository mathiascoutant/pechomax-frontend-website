import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export default function useLogout() {
  return useMutation<string, AxiosError<{ message: string }>>({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.get<string>('http://localhost:3000/auth/logout', { withCredentials: true })

      return response.data
    },
  })
}
