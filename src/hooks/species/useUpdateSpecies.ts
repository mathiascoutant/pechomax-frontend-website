import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Species } from '../../types/species'

type QueryVariables = Partial<Species> & { id: string }

export default function useUpdateConversation() {
  return useMutation<Species, QueryError, QueryVariables>({
    mutationKey: ['updateSpecies'],
    mutationFn: async (Specie) => {
      const response = await axios.put(`http://localhost:3000/species/update/${Specie.id}`, Specie, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
