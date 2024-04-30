import { useMutation } from '@tanstack/react-query'
import { User } from '../../types/user'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

export default function useUpdateUser() {
  return useMutation<User, QueryError, FormData>({
    mutationKey: ['updateUser'],
    mutationFn: async (user) => {
      const response = await AxosClient.put(`/users/update/${user.get('id')}`, user, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
