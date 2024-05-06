import React, { useCallback, useEffect } from 'react'
import { useUserStore } from '../../stores/UserStore'
import { Navigate } from 'react-router-dom'
import useLogin from '../../hooks/auth/useLogin'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'

interface FormInputs {
  credential: string
  password: string
}

const Login: React.FC = () => {
  const { setUsername } = useUserStore()
  const { mutate, isError, isSuccess, isPending, data } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<FormInputs>()

  const onSubmit = useCallback<SubmitHandler<FormInputs>>((formDatas) => mutate(formDatas), [])

  useEffect(() => {
    if (isSuccess) {
      setUsername(data.username)
    }
  }, [isSuccess])

  if (isSuccess) {
    setUsername(data.username)
    return <Navigate to="/" />
  }

  return (
    <>
      <h2>Connectez-vous à votre compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
        <FormInput
          type="text"
          label="Nom d'utilisateur ou Email"
          {...register('credential', { required: true, disabled: isPending || isLoading })}
        >
          {errors.credential?.type === 'required' && <p className="text-red-500">Ce champ est requis</p>}
        </FormInput>
        <FormInput
          type="password"
          label="Mot de passe"
          {...register('password', { required: true, disabled: isPending || isLoading })}
        >
          {errors.password?.type === 'required' && <p className="text-red-500">Ce champ est requis</p>}
        </FormInput>
        <Button submit disabled={isPending || isLoading}>
          Se connecter
        </Button>
      </form>
      {isError && <span className="text-red-800">Une erreur s'est produite, veuillez réessayer</span>}
    </>
  )
}

export default Login
