import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Catches } from '../../types/catches'

export default function useCategorie(id: string) {
  return useQuery<Catches, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Catches>(`/catches/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
