import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Location } from '../../types/locations'

export default function useLocations(id: string) {
  return useQuery<Location, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Location>(`/locations/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
