import { Navigate } from 'react-router-dom'
import useCreateLevels from '../../hooks/levels/useCreateLevels'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

interface FormInput {
  title: string
  value: number
  start: number
  end: number
}

const CreateLevel: React.FC = () => {
  const { mutate, isSuccess } = useCreateLevels()
  const { register, handleSubmit } = useForm<FormInput>()

  const onSubmit = handleSubmit((datas) => {
    mutate({ ...datas, end: datas.end > 0 ? datas.end : undefined })
  })

  if (isSuccess) {
    return <Navigate to="/levels" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Créer</Button>}>
          <FormInput label="Titre" type="text" {...register('title')}></FormInput>
          <FormInput label="Valeur" type="number" {...register('value', { valueAsNumber: true })}></FormInput>
          <FormInput label="Début" type="number" {...register('start', { valueAsNumber: true })}></FormInput>
          <FormInput label="Fin" type="text" {...register('end', { valueAsNumber: true })}></FormInput>
        </Container>
      </form>
    </div>
  )
}

export default CreateLevel
