import { Navigate } from 'react-router-dom'
import useCreateCatches from '../../hooks/catches/useCreateCatches'
import useSpeciesList from '../../hooks/species/useSpeciesList'
import { useForm } from 'react-hook-form'
import useLocationList from '../../hooks/locations/useLocationList'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'
import { FormSelect } from '../../components/Form/Select'

interface FormInputs {
  length: string
  weight: string
  description: string
  date: string
  speciesId: string
  locationId: string
}

const CreateCatches: React.FC = () => {
  const { mutate, isSuccess } = useCreateCatches()
  const { data: species } = useSpeciesList()
  const { data: locations } = useLocationList()
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit = handleSubmit((datas) => {
    const formData = new FormData()
    formData.append('length', datas.length)
    formData.append('weight', datas.weight)
    formData.append('description', datas.description)
    formData.append('date', datas.date)
    formData.append('speciesId', datas.speciesId)
    formData.append('locationId', datas.locationId)

    mutate(formData)
  })

  if (isSuccess) {
    return <Navigate to="/catches" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput type="text" label="Description" {...register('description')}></FormInput>
          <FormInput type="number" label="Taille" {...register('length')}></FormInput>
          <FormInput type="number" label="Poids" {...register('weight')}></FormInput>
          <FormInput type="date" label="Date" {...register('date')}></FormInput>
          <FormSelect
            label="Espece"
            options={species?.map((s) => ({ key: s.name, value: s.id })) ?? []}
            defaultValue="Choississez une espece"
            {...register('speciesId')}
          />
          <FormSelect
            label="Localisation"
            options={locations?.map((l) => ({ key: l.name, value: l.id })) ?? []}
            defaultValue="Choississez une localisation"
            {...register('locationId')}
          />
        </Container>
      </form>
    </div>
  )
}

export default CreateCatches
