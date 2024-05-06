import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

interface QueryReturn {
  id: string
}

interface QueryVariables {
  id: string
}

export default function useDeleteCategorie() {
  const queryClient = useQueryClient()
  return useMutation<QueryReturn, QueryError, QueryVariables>({
    mutationKey: ['deleteCategorie'],
    mutationFn: async ({ id }) => {
      const response = await AxosClient.delete(`/categories/delete/${id}`, { withCredentials: true })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-list'] })
    },
  })
}
