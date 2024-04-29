import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Catches } from '../../types/catches'

type QueryVariables = Partial<Catches> & { id: string }

export default function useUpdateCatches() {
  return useMutation<Catches, QueryError, QueryVariables>({
    mutationKey: ['updateCatches'],
    mutationFn: async (Catches) => {
      const response = await axios.put(`http://localhost:3000/catches/update/${Catches.id}`, Catches, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
