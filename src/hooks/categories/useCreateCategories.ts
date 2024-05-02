import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  name: string
}

export default function useCreateCategorie() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createcategorie'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/categories/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
