import { Navigate } from 'react-router-dom'
import useCreateCategorie from '../../hooks/categories/useCreateCategories'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInput {
  name: string
}

const CreateConversation: React.FC = () => {
  const { mutate, isSuccess } = useCreateCategorie()
  const { register, handleSubmit } = useForm<FormInput>()

  const onSubmit = handleSubmit((datas) => {
    mutate(datas)
  })

  if (isSuccess) {
    return <Navigate to="/categories" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput label="Nom" type="text" {...register('name')}></FormInput>
        </Container>
      </form>
    </div>
  )
}

export default CreateConversation
