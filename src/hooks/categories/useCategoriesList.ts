import { useQuery } from '@tanstack/react-query'
import { Categorie } from '../../types/categorie'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryReturn = Categorie[]

export default function useCategorieList() {
  return useQuery<QueryReturn, QueryError>({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await AxosClient.get<QueryReturn>('/categories', { withCredentials: true })

      return response.data
    },
  })
}
