import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Species } from '../../types/species'

export default function useSpecies(id: string) {
  return useQuery<Species, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Species>(`/species/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
