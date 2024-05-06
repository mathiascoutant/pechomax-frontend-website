import { Navigate, useParams } from 'react-router-dom'
import useConversation from '../../hooks/conversations/useConversation'
import useUpdateConversation from '../../hooks/conversations/useUpdateConversation'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../components/Form/Input'
import { FormSelect } from '../../components/Form/Select'
import useCategorieList from '../../hooks/categories/useCategoriesList'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'

interface FormInput {
  title: string
  categoryId: string
}

function UpdateConversation() {
  const { id } = useParams<{ id: string }>()
  const { data: conversation, isLoading, isSuccess, isError } = useConversation(id ?? '')
  const { data: categories } = useCategorieList()
  const { mutate, isSuccess: mutationSuccess } = useUpdateConversation()
  const { register, handleSubmit } = useForm<FormInput>({
    values: { title: conversation?.title ?? '', categoryId: conversation?.categoryId ?? '' },
  })

  const onSubmit = handleSubmit((datas) => {
    mutate({ id: conversation?.id ?? '', ...datas })
  })

  if (mutationSuccess) {
    return <Navigate to="/conversations" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        {isLoading && <span>Chargement...</span>}
        {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
        {isSuccess && (
          <Container footer={<Button submit>Enregistrer</Button>}>
            <FormInput label="Titre" type="text" {...register('title')}></FormInput>
            <FormSelect
              label="Categorie"
              options={categories?.map((c) => ({ key: c.name, value: c.id })) ?? []}
              defaultValue="Choississez une catégorie"
              {...register('categoryId')}
            ></FormSelect>
          </Container>
        )}
      </form>
    </div>
  )
}

export default UpdateConversation
