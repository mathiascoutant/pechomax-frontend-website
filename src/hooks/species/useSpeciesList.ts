import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Species } from '../../types/species'

type QueryReturn = Species[]

export default function useSpeciesList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['species-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/species', { withCredentials: true })

      return response.data
    },
  })
}
