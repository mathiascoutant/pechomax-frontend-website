import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

export default function useCreateCatches() {
  return useMutation<Payload, QueryError, FormData>({
    mutationKey: ['createcatches'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/catches/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
