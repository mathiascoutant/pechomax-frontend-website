import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
    name: string
    pointValue: number
}

export default function useCreateSpecies() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createSpecies'],
    mutationFn: async (postData) => {
      const respone = await axios.post<Payload>('http://localhost:3000/species/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
