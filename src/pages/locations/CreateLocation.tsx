import { Navigate } from 'react-router-dom'
import useCreateLocation from '../../hooks/locations/useCreateLocation'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInputs {
  name: string
  latitude: string
  longitude: string
  description: string
}

const CreateLocation: React.FC = () => {
  const { mutate, isSuccess } = useCreateLocation()
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit = handleSubmit((datas) => {
    mutate(datas)
  })

  if (isSuccess) {
    return <Navigate to="/locations" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput label="Nom" type="text" {...register('name')}></FormInput>
          <FormInput label="Description" type="text" {...register('description')}></FormInput>
          <FormInput label="Longitude" type="number" step="0.000000000001" {...register('longitude')}></FormInput>
          <FormInput label="Latitude" type="number" step="0.000000000001" {...register('latitude')}></FormInput>
        </Container>
      </form>
    </div>
  )
}

export default CreateLocation
