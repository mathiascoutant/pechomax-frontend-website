import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Catches } from '../../types/catches'

type QueryVariables = Partial<Catches> & { id: string }

export default function useUpdateCatches() {
  return useMutation<Catches, QueryError, QueryVariables>({
    mutationKey: ['updateCatches'],
    mutationFn: async (Catches) => {
      const response = await AxosClient.put(`/catches/update/${Catches.id}`, Catches, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
