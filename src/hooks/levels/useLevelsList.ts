import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Levels } from '../../types/levels'

type QueryReturn = Levels[]

export default function useLevelsList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['levels-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/levels?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
