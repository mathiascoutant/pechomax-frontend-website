import { useMutation } from '@tanstack/react-query'
import AxosClient from '../../helpers/axios'
import { QueryError } from '../../types/query'

type QueryReturn = string

export default function useLogout() {
  return useMutation<QueryReturn, QueryError>({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/auth/logout', { withCredentials: true })

      return response.data
    },
  })
}
