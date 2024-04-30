import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Location } from '../../types/locations'

type QueryReturn = Location[]

export default function useLocationList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['location-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/locations', { withCredentials: true })

      return response.data
    },
  })
}
