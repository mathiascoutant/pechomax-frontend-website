import { useQuery } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Categorie } from '../../types/categorie'

export default function useCategorie(id: string) {
  return useQuery<Categorie, QueryError>({
    queryKey: ['id', id],
    queryFn: async () => {
      const response = await AxosClient.get<Categorie>(`/categories/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
