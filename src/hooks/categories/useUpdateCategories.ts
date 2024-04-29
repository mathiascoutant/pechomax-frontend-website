import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Categorie } from '../../types/categorie'

type QueryVariables = Partial<Categorie> & { id: string }

export default function useUpdateCategorie() {
  return useMutation<Categorie, QueryError, QueryVariables>({
    mutationKey: ['updateCategorie'],
    mutationFn: async (Categorie) => {
      const response = await AxosClient.put(`/categories/update/${Categorie.id}`, Categorie, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
