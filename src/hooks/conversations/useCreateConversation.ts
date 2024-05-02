import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  title: string
}

export default function useCreateConversation() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createConversation'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/conversations/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
