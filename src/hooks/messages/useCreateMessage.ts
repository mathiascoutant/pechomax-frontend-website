import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

export default function useCreateMessage() {
  return useMutation<Payload, QueryError, FormData>({
    mutationKey: ['createMessage'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/messages/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
