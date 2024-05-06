import { Navigate, useParams } from 'react-router-dom'
import useUser from '../../hooks/users/useUser'
import useUpdateUser from '../../hooks/users/useUpdateUser'
import Container from '../../components/Container'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'

interface FormInputs {
  username: string
  email: string
  password: string
  phoneNumber: string
  city: string
  region: string
  role: string
  score: string
}

function UpdateUser() {
  const { username } = useParams<{ username: string }>()
  console.log(username)
  const { data: user, isLoading: userIsLoading, isSuccess, isError } = useUser(username ?? '')
  const { mutate, isSuccess: mutationSuccess, isPending } = useUpdateUser()
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<FormInputs>({
    values: {
      city: user?.city ?? '',
      email: user?.email ?? '',
      password: '',
      phoneNumber: user?.phoneNumber ?? '',
      region: user?.region ?? '',
      role: user?.role ?? '',
      score: user?.score.toString() ?? '',
      username: user?.username ?? '',
    },
  })

  const onSubmit = handleSubmit((datas) => {
    const formData = new FormData()
    if (datas.username) formData.append('username', datas.username)
    if (datas.email) formData.append('email', datas.email)
    if (datas.password) formData.append('password', datas.password)
    if (datas.phoneNumber) formData.append('phoneNumber', datas.phoneNumber)
    if (datas.city) formData.append('city', datas.city)
    if (datas.region) formData.append('region', datas.region)
    if (datas.role) formData.append('role', datas.role)
    if (datas.score) formData.append('score', datas.score)
    formData.append('id', user?.id ?? '')

    mutate(formData)
  })

  if (mutationSuccess) {
    return <Navigate to="/users" />
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
          {userIsLoading && <span>Chargement...</span>}
          {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
          {isSuccess && (
            <>
              <FormInput
                label="Nom d'utilisateur"
                type="text"
                defaultValue={user.username}
                {...register('username', { minLength: 3, disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Addresse email"
                type="text"
                {...register('email', { pattern: /^\S+@\S+\.\S{2,}$/i, disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Mot de passe"
                type="password"
                {...register('password', { minLength: 8, disabled: isLoading || isPending })}
              >
                {errors.password?.type === 'minLength' && <p className="text-red-500">Minimum 8 caractères</p>}
              </FormInput>
              <FormInput
                label="Numéro de téléphone"
                type="text"
                {...register('phoneNumber', { disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Région"
                type="text"
                {...register('region', { disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Ville"
                type="text"
                {...register('city', { disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Role"
                type="text"
                {...register('role', { disabled: isLoading || isPending })}
              ></FormInput>
              <FormInput
                label="Score"
                type="number"
                {...register('score', { valueAsNumber: true, disabled: isLoading || isPending })}
              ></FormInput>
            </>
          )}
        </Container>
      </form>
    </div>
  )
}

export default UpdateUser
