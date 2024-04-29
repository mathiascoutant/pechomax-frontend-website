import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Catches } from '../../types/catches'

export default function useCategorie(id: string) {
  return useQuery<Catches, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await axios.get<Catches>(`http://localhost:3000/catches/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
