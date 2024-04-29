import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Species } from '../../types/species'

type QueryReturn = Species[]

export default function useSpeciesList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['species-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/species', { withCredentials: true })

      return response.data
    },
  })
}
