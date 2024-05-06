import { Navigate } from 'react-router-dom'
import useCreateSpecies from '../../hooks/species/useCreateSpecies'
import Container from '../../components/Container'
import { FormInput } from '../../components/Form/Input'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'

interface FormInputs {
  name: string
  pointValue: string
}

const CreateSpecies: React.FC = () => {
  const { mutate, isSuccess, isPending } = useCreateSpecies()
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<FormInputs>()

  const onSubmit = handleSubmit((datas) => {
    mutate({ name: datas.name, pointValue: Number(datas.pointValue) })
  })

  if (isSuccess) {
    return <Navigate to="/species" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container
          footer={
            <Button submit disabled={isPending || isLoading}>
              Ajouter
            </Button>
          }
        >
          <FormInput type="text" label="Nom" disabled={isPending || isLoading} {...register('name')}></FormInput>
          <FormInput
            type="text"
            label="Valeur"
            disabled={isPending || isLoading}
            {...register('pointValue')}
          ></FormInput>
        </Container>
      </form>
    </div>
  )
}

export default CreateSpecies
