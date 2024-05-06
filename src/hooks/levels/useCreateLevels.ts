import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  title: string
  value: number
  start: number
  end?: number
}

export default function useCreateLevels() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createlevels'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/levels/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
