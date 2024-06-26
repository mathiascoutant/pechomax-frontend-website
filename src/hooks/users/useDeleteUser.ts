import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

interface QueryReturn {
  id: string
}

interface QueryVariables {
  id: string
}

export default function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation<QueryReturn, QueryError, QueryVariables>({
    mutationKey: ['deleteUser'],
    mutationFn: async ({ id }) => {
      const response = await AxosClient.delete(`/users/delete/${id}`, { withCredentials: true })

      return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-list'] }),
  })
}
