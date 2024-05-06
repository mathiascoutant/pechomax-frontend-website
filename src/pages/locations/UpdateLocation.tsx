import { Navigate, useParams } from 'react-router-dom'
import useLocations from '../../hooks/locations/useLocations'
import useUpdateLocation from '../../hooks/locations/useUpdateLocation'
import Container from '../../components/Container'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInputs {
  name: string
  latitude: string
  longitude: string
  description: string
}

function UpdateLocation() {
  const { id } = useParams<{ id: string }>()
  const { data: locations, isLoading, isSuccess, isError } = useLocations(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateLocation()
  const { register, handleSubmit } = useForm<FormInputs>({
    values: {
      description: locations?.description ?? '',
      latitude: locations?.latitude ?? '',
      longitude: locations?.longitude ?? '',
      name: locations?.name ?? '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate({ id: id ?? '', ...data })
  })

  if (mutationSuccess) {
    return <Navigate to="/locations" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Enregistrer</Button>}>
          {isLoading && <span>Chargement...</span>}
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          {isSuccess && (
            <>
              <FormInput label="Nom" type="text" {...register('name')}></FormInput>
              <FormInput label="Description" type="text" {...register('description')}></FormInput>
              <FormInput label="Longitude" type="number" step="0.000000000001" {...register('longitude')}></FormInput>
              <FormInput label="Latitude" type="number" step="0.000000000001" {...register('latitude')}></FormInput>
            </>
          )}
        </Container>
      </form>
    </div>
  )
}

export default UpdateLocation
