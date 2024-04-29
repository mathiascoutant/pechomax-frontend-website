import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import axios from 'axios'
import { Messages } from '../../types/message'

type FormData = Partial<Messages> & { id: string }

export default function useUpdateConversation() {
  return useMutation<Messages, QueryError, FormData>({
    mutationKey: ['updateMessage'],
    mutationFn: async (Message) => {
      const response = await axios.put(`http://localhost:3000/messages/update/${Message.id}`, Message, {
        withCredentials: true,
      })

      return response.data
    },
  })
}
