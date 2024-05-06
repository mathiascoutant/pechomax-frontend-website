import { Navigate, useParams } from 'react-router-dom'
import useCategorie from '../../hooks/categories/useCategories'
import useUpdateCategorie from '../../hooks/categories/useUpdateCategories'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../components/Form/Input'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'

interface FormInput {
  name: string
}

function UpdateCategorie() {
  const { id } = useParams<{ id: string }>()
  const { data: categorie, isLoading, isSuccess, isError } = useCategorie(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateCategorie()
  const { register, handleSubmit } = useForm<FormInput>({
    values: { name: categorie?.name ?? '' },
  })

  const onSubmit = handleSubmit((datas) => {
    mutate({ id: categorie?.id ?? '', ...datas })
  })

  if (mutationSuccess) {
    return <Navigate to="/categories" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        {isLoading && <span>Loading...</span>}
        {isError && <span>An error occured, please try again</span>}
        {isSuccess && (
          <Container footer={<Button submit>Enregistrer</Button>}>
            <FormInput label="Nom" type="text" {...register('name')}></FormInput>
          </Container>
        )}
      </form>
    </div>
  )
}

export default UpdateCategorie
