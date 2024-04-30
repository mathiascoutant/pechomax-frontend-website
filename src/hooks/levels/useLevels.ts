import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Levels } from '../../types/levels'

export default function useLevels(id: string) {
  return useQuery<Levels, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Levels>(`/levels/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
