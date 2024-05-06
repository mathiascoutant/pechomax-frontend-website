import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Location } from '../../types/locations'

type QueryReturn = Location[]

export default function useLocationList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['location-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/locations?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
