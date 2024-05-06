import { Navigate, useParams } from 'react-router-dom'
import useSpecies from '../../hooks/species/useSpecies'
import useUpdateSpecies from '../../hooks/species/useUpdateSpecies'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInputs {
  name: string
  pointValue: string
}

function UpdateSpecies() {
  const { id } = useParams<{ id: string }>()
  const { data: species, isLoading: speciesIsLoading, isSuccess, isError } = useSpecies(id ?? '')
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<FormInputs>({
    values: {
      name: species?.name ?? '',
      pointValue: species?.pointValue.toString() ?? '',
    },
  })
  const { mutate, isSuccess: mutationSuccess } = useUpdateSpecies()

  const onSubmit = handleSubmit((datas) => {
    mutate({ id: id ?? '', name: datas.name, pointValue: Number(datas.pointValue) })
  })

  if (mutationSuccess) {
    return <Navigate to="/species" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container
          footer={
            <Button submit disabled={isLoading}>
              Mettre a Jour
            </Button>
          }
        >
          {speciesIsLoading && <span>Chargement...</span>}
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          {isSuccess && (
            <>
              <FormInput
                type="text"
                label="Id"
                disabled
                name=""
                defaultValue={species?.id ?? ''}
                onBlur={async () => void 0}
                onChange={async () => void 0}
              ></FormInput>
              <FormInput type="text" label="Nom" {...register('name')}></FormInput>
              <FormInput type="number" label="Valeur" {...register('pointValue')}></FormInput>
            </>
          )}
        </Container>
      </form>
    </div>
  )
}

export default UpdateSpecies
