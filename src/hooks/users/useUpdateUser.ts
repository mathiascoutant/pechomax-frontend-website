import { useMutation } from '@tanstack/react-query'
import { User } from '../../types/user'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'

type QueryVariables = Partial<User> & { id: string }

export default function useUpdateUser() {
  return useMutation<User, QueryError, QueryVariables>({
    mutationKey: ['updateUser'],
    mutationFn: async (user) => {
      const response = await AxosClient.put(`/users/update/${user.id}`, user, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
