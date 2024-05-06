import { Navigate, useParams } from 'react-router-dom'
import useMessage from '../../hooks/messages/useMessage'
import useUpdateMessage from '../../hooks/messages/useUpdateMessage'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInputs {
  content: string
}

function UpdateMessage() {
  const { id } = useParams<{ id: string }>()
  const { data: message, isLoading: messageIsLoading, isSuccess, isError } = useMessage(id ?? '')
  const { mutate, isSuccess: mutationSuccess, isPending } = useUpdateMessage()
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<FormInputs>({ values: { content: message?.content ?? '' } })

  const onSubmit = handleSubmit((datas) => {
    const formData = new FormData()
    if (datas.content) formData.append('content', datas.content)
    formData.append('id', message?.id ?? '')

    mutate(formData)
  })

  if (mutationSuccess) {
    return <Navigate to="/messages" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        {messageIsLoading && <span>Loading...</span>}
        {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
        {isSuccess && (
          <Container
            footer={
              <Button submit disabled={isLoading || isPending}>
                Enregistrer
              </Button>
            }
          >
            <FormInput
              type="text"
              label="Identifiant"
              name=""
              onBlur={async () => void 0}
              onChange={async () => void 0}
              disabled
            ></FormInput>
            <FormInput
              type="text"
              label="Contenu"
              disabled={isLoading || isPending}
              {...register('content')}
            ></FormInput>
          </Container>
        )}
      </form>
    </div>
  )
}

export default UpdateMessage
