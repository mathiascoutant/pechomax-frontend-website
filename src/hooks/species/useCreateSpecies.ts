import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  name: string
  pointValue: number
}

export default function useCreateSpecies() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createSpecies'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/species/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
