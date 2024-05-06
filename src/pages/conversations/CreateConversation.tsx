import useCreateConversation from '../../hooks/conversations/useCreateConversation'
import { Navigate } from 'react-router-dom'
import useCategorieList from '../../hooks/categories/useCategoriesList'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'
import { FormSelect } from '../../components/Form/Select'

interface FormInput {
  title: string
  categoryId: string
}

const CreateConversation: React.FC = () => {
  const { mutate, isSuccess } = useCreateConversation()
  const { data: categories } = useCategorieList()
  const { register, handleSubmit } = useForm<FormInput>()

  const onSubmit = handleSubmit((datas) => {
    mutate(datas)
  })

  if (isSuccess) {
    return <Navigate to="/conversations" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput label="Titre" type="text" {...register('title')}></FormInput>
          <FormSelect
            label="Categorie"
            options={categories?.map((c) => ({ key: c.name, value: c.id })) ?? []}
            defaultValue="Choississez une catégorie"
            {...register('categoryId')}
          ></FormSelect>
        </Container>
      </form>
    </div>
  )
}

export default CreateConversation
