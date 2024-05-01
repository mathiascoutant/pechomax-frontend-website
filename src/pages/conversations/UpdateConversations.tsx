import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useConversation from '../../hooks/conversations/useConversation'
import useUpdateConversation from '../../hooks/conversations/useUpdateConversation'

function UpdateConversation() {
  const { id } = useParams<{ id: string }>()
  const { data: conversation, isLoading, isSuccess, isError } = useConversation(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateConversation()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: conversation?.id ?? '',
        title: formData.get('title')?.toString(),
        categoryId: formData.get('categoryId')?.toString(),
      }

      mutate(putData)
    },
    [conversation]
  )

  if (mutationSuccess) {
    return <Navigate to="/conversations" />
  }

  return (
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Conversations</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">User:</p>
                  <p className="mb-4">Title:</p>
                  <p className="mb-4">CategoryId:</p>
                  <p className="mb-4">Date de création:</p>
                  <p className="mb-4">Date de modification:</p>
                </div>
                <div>
                  <p className="mb-4">{conversation.id}</p>
                  <p className="mb-4">{conversation.user.username}</p>
                  <input
                    className="mb-4"
                    type="text"
                    name="title"
                    defaultValue={conversation.title}
                    placeholder="Title"
                  /> <br />
                  <input className="mb-4" type="text" name="categoryId" placeholder="CategoryId" defaultValue={conversation.categoryId} />
                  <p className="mb-4">{conversation.createdAt}</p>
                  <p className="mb-4">{conversation.updatedAt}</p>
                </div>
                <button className='bg-[#A7C4E4] w-fit p-1'>Modifier</button>
              </div>
            </div>
          </form>
        )}
      </div>
  )
}

export default UpdateConversation
