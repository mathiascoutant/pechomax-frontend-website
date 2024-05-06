import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

interface QueryReturn {
  id: string
}

interface QueryVariables {
  id: string
}

export default function useDeleteSpecies() {
  const queryClient = useQueryClient()
  return useMutation<QueryReturn, QueryError, QueryVariables>({
    mutationKey: ['deleteSpecies'],
    mutationFn: async ({ id }) => {
      const response = await AxosClient.delete(`/species/delete/${id}`, { withCredentials: true })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['species-list'] })
    },
  })
}
