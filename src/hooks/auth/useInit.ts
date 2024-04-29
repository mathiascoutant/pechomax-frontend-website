import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  username: string
  email: string
  password: string
}

export default function useInit() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['init'],
    mutationFn: async (postData) => {
      const respone = await AxosClient.post<Payload>('/auth/init', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
