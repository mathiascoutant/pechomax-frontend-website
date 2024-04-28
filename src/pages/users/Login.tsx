import React, { SyntheticEvent, useCallback, useEffect } from 'react'
import { useUserStore } from '../../stores/UserStore'
import { Link, Navigate } from 'react-router-dom'
import useLogin from '../../hooks/auth/useLogin'

const Login: React.FC = () => {
  const { username, setUsername } = useUserStore()
  const { mutate, isError, isSuccess, data } = useLogin()

  const handleLogin = useCallback(async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const postData = {
      credential: formData.get('credential')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    }

    mutate(postData)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setUsername(data.username)
    }
  }, [isSuccess])

  if (isSuccess) {
    return <Navigate to="/" />
  }

  if (username) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-[url('./src/assets/images/background-login.jpeg')] flex flex-col h-screen w-screen bg-no-repeat m-0 p-0">
      <div className="w-screen">
        <Link to="/">
          <img className="w-20" src="./src/assets/images/logo.png" alt="" />
        </Link>
      </div>
      <div className="flex items-center justify-center bg-white max-w-96 w-auto m-auto">
        <div className="m-auto w-fit p-10">
          <h2 className="text-black-600 mb-5">Connectez-vous à votre compte</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input
                className="border-2 border-black-600 mb-3 w-full pl-2"
                type="text"
                name="credential"
                placeholder="Username or E-mail"
              />
            </div>
            <div>
              <input
                className="border-2 border-black-600 mb-4 w-full pl-2"
                type="password"
                name="password"
                placeholder="Mot de passe"
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-[#A7C4E4] pt-1 pb-1 pl-2 pr-2 rounded-md" type="submit">
                Se connecter
              </button>
            </div>
          </form>
          {isError && <span className="text-red-800">Une erreur s'est produite, veuillez réessayer</span>}
        </div>
      </div>
    </div>
  )
}

export default Login
