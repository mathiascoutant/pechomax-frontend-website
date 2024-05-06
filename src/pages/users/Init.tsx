import { useCallback } from 'react'
import useInit from '../../hooks/auth/useInit'
import { Navigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { FormInput } from '../../components/Form/Input'

type FormInputs = {
  username: string
  email: string
  password: string
}

const Init: React.FC = () => {
  const { mutate, isError, error, isSuccess, isPending } = useInit()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormInputs>()

  const onSubmit = useCallback<SubmitHandler<FormInputs>>((formDatas) => mutate(formDatas), [])

  if (isSuccess) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h2>Créer un Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
        <FormInput
          type="text"
          label="Username"
          {...register('username', { required: true, disabled: isPending || isLoading, minLength: 3 })}
        >
          {errors.username?.type === 'required' && <p className="text-red-500">Ce champ est requis</p>}
          {errors.username?.type === 'minLength' && <p className="text-red-500">Minimum 3 caractères</p>}
        </FormInput>
        <FormInput
          type="text"
          label="E-mail"
          {...register('email', { required: true, disabled: isPending || isLoading, pattern: /^\S+@\S+\.\S{2,}$/i })}
        >
          {errors.email?.type === 'required' && <p className="text-red-500">Ce champ est requis</p>}
          {errors.email?.type === 'pattern' && <p className="text-red-500">Email non valide</p>}
        </FormInput>
        <FormInput
          type="password"
          label="Mot de passe"
          {...register('password', { required: true, disabled: isPending || isLoading, minLength: 8 })}
        >
          {errors.password?.type === 'required' && <p className="text-red-500">Ce champ est requis</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Minimum 8 caractères</p>}
        </FormInput>
        <Button submit disabled={isPending || isLoading}>
          S'inscrire
        </Button>
        {isError && <p className="text-red-500">{error.response?.data.message}</p>}
      </form>
    </>
  )
}

export default Init
