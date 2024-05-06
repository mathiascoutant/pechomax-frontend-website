import { Navigate } from 'react-router-dom'
import useConversationList from '../../hooks/conversations/useConversationList'
import useCreateMessage from '../../hooks/messages/useCreateMessage'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'
import { FormSelect } from '../../components/Form/Select'

interface FormInputs {
  content: string
  conversationId: string
}

const CreateMessage: React.FC = () => {
  const { mutate, isSuccess } = useCreateMessage()
  const { data: conversation, isLoading } = useConversationList()
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit = handleSubmit((datas) => {
    const formData = new FormData()
    formData.append('content', datas.content)
    formData.append('conversationId', datas.conversationId)

    mutate(formData)
  })

  if (isSuccess) {
    return <Navigate to="/messages" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput type="text" label="Contenue" {...register('content')}></FormInput>
          <FormSelect
            label="Conversation id"
            defaultValue="Choississez une conversation"
            disabled={isLoading}
            options={conversation?.map((c) => ({ key: c.title, value: c.id })) ?? []}
            {...register('conversationId')}
          ></FormSelect>
        </Container>
      </form>
    </div>
  )
}

export default CreateMessage
