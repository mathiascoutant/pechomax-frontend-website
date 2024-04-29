import { useQuery } from '@tanstack/react-query'
import { Catches } from '../../types/catches'
import { QueryError } from '../../types/query'
import axios from 'axios'

type QueryReturn = Catches[]

export default function useCatchesList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['catches-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/catches', { withCredentials: true })

      return response.data
    },
  })
}
