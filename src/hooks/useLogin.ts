import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export default function useLogin() {
  return useMutation<{ username: string }, AxiosError<{ message: string }>, { credential: string; password: string }>({
    mutationKey: ['login'],
    mutationFn: async (postData) => {
      const response = await axios.post<{ username: string }>('http://localhost:3000/auth/login', postData, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
