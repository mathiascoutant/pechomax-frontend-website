import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

export default function useCreateMessage() {
  return useMutation<Payload, QueryError, FormData>({
    mutationKey: ['createMessage'],
    mutationFn: async (postData) => {
      const respone = await axios.post<Payload>('http://localhost:3000/messages/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
