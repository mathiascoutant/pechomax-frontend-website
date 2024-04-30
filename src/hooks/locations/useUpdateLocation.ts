import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Location } from '../../types/locations'

type QueryVariables = Partial<Location> & { id: string }

export default function useUpdateLocation() {
  return useMutation<Location, QueryError, QueryVariables>({
    mutationKey: ['updateLocation'],
    mutationFn: async (Locations) => {
      const response = await AxosClient.put(`/locations/update/${Locations.id}`, Locations, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
