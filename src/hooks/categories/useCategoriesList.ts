import { useQuery } from '@tanstack/react-query'
import { Categorie } from '../../types/categorie'
import { QueryError } from '../../types/query'
import axios from 'axios'

type QueryReturn = Categorie[]

export default function useCategorieList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await axios.get<QueryReturn>('http://localhost:3000/categories', { withCredentials: true })

      return response.data
    },
  })
}
