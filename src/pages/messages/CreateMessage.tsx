import { SyntheticEvent, useCallback} from 'react'
import { Navigate } from 'react-router-dom'
import useConversationList from '../../hooks/conversations/useConversationList'
import useCreateMessage from '../../hooks/messages/useCreateMessage'

const CreateMessage: React.FC = () => {
  const { mutate, isError, isSuccess } = useCreateMessage()
  const { data: conversation, isSuccess: isConversationSuccess } = useConversationList()

  const handleCreateMessage = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    mutate(data)
  }, [])

  if (isSuccess) {
    return <Navigate to="/messages" />
  }

  return (
    <>
      <div className='w-full '>
        <div className=" w-full">
          <div className="mt-10 flex items-center justify-center">
              {isError && <p>Error fetching Messages</p>}
                <form className="grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center" onSubmit={handleCreateMessage}>
                  <input className='m-2' type="text" name="content" placeholder="Content" />
                  <select className='m-2' name="conversationId">
                  {isConversationSuccess &&
                    conversation.map((conversation, index) => (
                      <option key={index} value={conversation.id}>
                        {conversation.title}
                      </option>
                    ))}
                  </select>
                  <input type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateMessage
