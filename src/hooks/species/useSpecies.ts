import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Species } from '../../types/species'

export default function useSpecies(id: string) {
  return useQuery<Species, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await axios.get<Species>(`http://localhost:3000/species/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
