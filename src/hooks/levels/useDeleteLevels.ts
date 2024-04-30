import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

interface QueryReturn {
  id: string
}

interface QueryVariables {
    id: string
}

export default function useDeleteLevels() {
  return useMutation<QueryReturn, QueryError, QueryVariables>({
    mutationKey: ['deleteLevel'],
    mutationFn: async ({ id }) => {
      const response = await AxosClient.delete(`/levels/delete/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
