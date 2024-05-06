import { Navigate, useParams } from 'react-router-dom'
import useLevels from '../../hooks/levels/useLevels'
import useUpdateLevels from '../../hooks/levels/useUpdateLevels'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../components/Form/Input'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'

interface FormInput {
  title: string
  value: number
  start: number
  end: number
}

function UpdateLevel() {
  const { id } = useParams<{ id: string }>()
  const { data: levels, isLoading, isSuccess, isError } = useLevels(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateLevels()
  const { register, handleSubmit } = useForm<FormInput>({
    values: {
      end: levels?.end ?? -1,
      start: levels?.start ?? 0,
      title: levels?.title ?? '',
      value: levels?.value ?? 0,
    },
  })

  const onSubmit = handleSubmit((datas) => {
    mutate({ ...datas, id: id ?? '', end: datas.end > 0 ? datas.end : undefined })
  })

  if (mutationSuccess) {
    return <Navigate to="/levels" />
  }

  return (
    <div className="self-start">
      <form onSubmit={onSubmit}>
        <Container footer={<Button submit>Enregistrer</Button>}>
          {isLoading && <span>Chargement...</span>}
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          {isSuccess && (
            <>
              <FormInput label="Titre" type="text" {...register('title')}></FormInput>
              <FormInput label="Valeur" type="number" {...register('value')}></FormInput>
              <FormInput label="Début" type="number" {...register('start')}></FormInput>
              <FormInput label="Fin" type="number" {...register('end')}></FormInput>
            </>
          )}
        </Container>
      </form>
    </div>
  )
}

export default UpdateLevel
