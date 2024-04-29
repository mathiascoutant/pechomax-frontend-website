import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Categorie } from '../../types/categorie'

type QueryVariables = Partial<Categorie> & { id: string }

export default function useUpdateCategorie() {
  return useMutation<Categorie, QueryError, QueryVariables>({
    mutationKey: ['updateCategorie'],
    mutationFn: async (Categorie) => {
      const response = await axios.put(`http://localhost:3000/categories/update/${Categorie.id}`, Categorie, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
