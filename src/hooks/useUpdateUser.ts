import { useMutation } from '@tanstack/react-query'
import { User } from '../types/user'
import { QueryError } from '../types/query'
import axios from 'axios'

type QueryVariables = Partial<User> & { id: string }

export default function useUpdateUser() {
  return useMutation<User, QueryError, QueryVariables>({
    mutationKey: ['updateUser'],
    mutationFn: async (user) => {
      const response = await axios.put(`http://localhost:3000/users/update/${user.id}`, user, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
