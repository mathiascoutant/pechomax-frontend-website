import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'

interface QueryReturn {
  id: string
}

interface QueryVariables {
  id: string
}

export default function useDeleteSpecies() {
  return useMutation<QueryReturn, QueryError, QueryVariables>({
    mutationKey: ['deleteSpecies'],
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`http://localhost:3000/species/delete/${id}`, { withCredentials: true })

      return response.data
    },
  })
}
