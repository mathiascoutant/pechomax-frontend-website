import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Catches } from '../../types/catches'

export default function useUpdateCatches() {
  return useMutation<Catches, QueryError, FormData>({
    mutationKey: ['updateCatches'],
    mutationFn: async (Catches) => {
      const response = await AxosClient.put(`/catches/update/${Catches.get('id')}`, Catches, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
