import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryError } from '../../types/query'
import Payload from '../../types/payload'

interface QueryVariables {
  weight: string
  length: string
  speciesId: string
  localisation: string
  description: string

}

export default function useCreateCatches() {
  return useMutation<Payload, QueryError, QueryVariables>({
    mutationKey: ['createcatches'],
    mutationFn: async (postData) => {
      const respone = await axios.post<Payload>('http://localhost:3000/catches/create', postData, {
        withCredentials: true,
      })

      return respone.data
    },
  })
}
