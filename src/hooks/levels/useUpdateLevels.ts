import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Levels } from '../../types/levels'

type QueryVariables = Partial<Levels> & { id: string }

export default function useUpdateLevels() {
  return useMutation<Levels, QueryError, QueryVariables>({
    mutationKey: ['updateLevels'],
    mutationFn: async (Levels) => {
      const response = await AxosClient.put(`/levels/update/${Levels.id}`, Levels, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
