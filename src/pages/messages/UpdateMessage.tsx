import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useMessage from '../../hooks/messages/useMessage'
import useUpdateMessage from '../../hooks/messages/useUpdateMessage'
import { Messages } from '../../types/message'

function UpdateMessage() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: message, isLoading, isSuccess, isError } = useMessage(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateMessage()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: message?.id ?? '',
        content: formData.get('content')?.toString(),
      }

      mutate(putData)

      queryClient.setQueryData(['message', message ?? ''], (old: Messages) => ({ ...old, ...putData }))
    },
    [message]
  )

  if (mutationSuccess) {
    return <Navigate to="/messages" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Messages</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Content:</p>
                  <p className="mb-4">UserId:</p>
                  <p className="mb-4">Date de création:</p>
                  <p className="mb-4">Date de modification:</p>
                </div>
                <div>
                  <p className="mb-4">{message.id}</p>
                  <input
                    className="mb-4"
                    type="text"
                    name="content"
                    defaultValue={message.content}
                    placeholder="Content"
                  />
                  <p className="mb-4">{message.userId}</p>
                  <p className="mb-4">{message.createdAt}</p>
                  <p className="mb-4">{message.updatedAt}</p>
                </div>
                <button>Modifier</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UpdateMessage

