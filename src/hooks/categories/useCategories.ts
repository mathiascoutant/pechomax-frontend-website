import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Categorie } from '../../types/categorie'

export default function useCategorie(id: string) {
  return useQuery<Categorie, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await axios.get<Categorie>(`http://localhost:3000/categories/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
