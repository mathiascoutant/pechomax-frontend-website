import { useQuery } from '@tanstack/react-query'
import { Catches } from '../../types/catches'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = Catches[]

export default function useCatchesList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['catches-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/catches', { withCredentials: true })

      return response.data
    },
  })
}
