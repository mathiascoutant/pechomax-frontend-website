import { useQuery } from '@tanstack/react-query'
import { Catches } from '../../types/catches'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = Catches[]

export default function useCatchesList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['catches-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/catches?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
