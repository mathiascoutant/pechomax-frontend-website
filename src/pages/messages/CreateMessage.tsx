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
    return <Navigate to="/listMessages" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
              {isError && <p>Error fetching Messages</p>}
                <form onSubmit={handleCreateMessage}>
                  <input type="text" name="content" placeholder="Content" />
                  <select name="conversationId" id="pet-select">
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
