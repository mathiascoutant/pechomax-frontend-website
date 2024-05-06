import { useQuery } from '@tanstack/react-query'
import { Categorie } from '../../types/categorie'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = Categorie[]

export default function useCategorieList(page: number = 1) {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['category-list', page],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>(`/categories?page=${page}`, { withCredentials: true })

      return response.data
    },
  })
}
