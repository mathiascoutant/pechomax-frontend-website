import { useMutation } from '@tanstack/react-query'
import { QueryError } from '../../types/query'
import AxosClient from '../../helpers/axios'
import { Messages } from '../../types/message'

type FormData = Partial<Messages> & { id: string }

export default function useUpdateConversation() {
  return useMutation<Messages, QueryError, FormData>({
    mutationKey: ['updateMessage'],
    mutationFn: async (Message) => {
      const response = await AxosClient.put(`/messages/update/${Message.id}`, Message, {
        withCredentials: true,
      })

      return response.data
    },
  })
}