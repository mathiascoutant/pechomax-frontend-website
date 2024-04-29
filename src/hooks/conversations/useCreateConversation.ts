import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
    title: string
}

export default function useCreateConversation() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createConversation'],
    mutationFn: async (postData) => {
      const respone = await axios.post<Payload>('http://localhost:3000/conversations/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
