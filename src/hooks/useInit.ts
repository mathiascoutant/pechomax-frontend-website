import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export default function useInit() {
  return useMutation<{ username: string }, AxiosError, { username: string; email: string; password: string }>({
    mutationKey: ['init'],
    mutationFn: async (postData: { username: string; email: string; password: string }) => {
      const respone = await axios.post<{ username: string }>('http://localhost:3000/auth/init', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
