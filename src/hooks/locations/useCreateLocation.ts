import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  longitude: string
  latitude: string
  name: string
  description: string
}


export default function useCreateLocation() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createlocation'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/locations/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
