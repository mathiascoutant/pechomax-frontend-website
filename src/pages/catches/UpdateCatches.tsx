import { Navigate, useParams } from 'react-router-dom'
import useCatches from '../../hooks/catches/useCatches'
import useUpdateCatches from '../../hooks/catches/useUpdateCatches'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInputs {
  length: string
  weight: string
  description: string
  pointValue: string
}

function UpdateCatches() {
  const { id } = useParams<{ id: string }>()
  const { data: catches, isLoading, isSuccess, isError } = useCatches(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateCatches()
  const { register, handleSubmit } = useForm<FormInputs>({
    values: {
      length: catches?.length ?? '',
      weight: catches?.weight ?? '',
      description: catches?.description ?? '',
      pointValue: catches?.pointValue.toString() ?? '',
    },
  })

  const onSubmit = handleSubmit((datas) => {
    const formData = new FormData()
    if (datas.length) formData.append('length', datas.length)
    if (datas.weight) formData.append('weight', datas.weight)
    if (datas.description) formData.append('description', datas.description)
    if (datas.pointValue) formData.append('pointValue', datas.pointValue)
    formData.append('id', id ?? '')

    mutate(formData)
  })

  if (mutationSuccess) {
    return <Navigate to="/catches" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Catches</p>}
        {isSuccess && (
          <Container footer={<Button submit>Enregistrer</Button>}>
            <FormInput label="Description" type="text" {...register('description')}></FormInput>
            <FormInput label="Valeur" type="number" {...register('pointValue')}></FormInput>
            <FormInput label="Taille" type="number" {...register('length')}></FormInput>
            <FormInput label="Poids" type="text" {...register('weight')}></FormInput>
          </Container>
        )}
      </form>
    </div>
  )
}

export default UpdateCatches
