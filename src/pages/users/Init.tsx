import { SyntheticEvent, useCallback } from 'react'
import useInit from '../../hooks/auth/useInit'
import { Link, Navigate } from 'react-router-dom'

const Init: React.FC = () => {
  const { mutate, isError, error, isSuccess } = useInit()

  const handleInit = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      username: data.get('username')?.toString() ?? '',
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <div>
        <div className="bg-[url('/src/assets/images/background-login.jpeg')] bg-cover flex flex-col h-screen w-screen bg-no-repeat m-0 p-0">
        <div className="w-screen">
          <Link to="/">
            <img className="w-20" src="./src/assets/images/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex items-center justify-center bg-white max-w-96 w-auto m-auto">
          <div className="m-auto w-fit p-10">
            <h2 className="text-black-600 mb-5 text-center">Deviens pêcheur !</h2>
            <form onSubmit={handleInit}>
              <div>
                <input
                  className="border-2 border-black-600 mb-3 w-full pl-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  className="border-2 border-black-600 mb-3 w-full pl-2"
                  type="text"
                  name="email"
                  placeholder="E-mail"
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
                  S'inscrire
                </button>
              </div>
            </form>
            {isError && <span className="text-red-800">Une erreur s'est produite, veuillez réessayer</span>}
          </div>
        </div>
      </div>
        {isError && <span className="text-red-800">{error?.response?.data.message}</span>}
      </div>
    </>
  )
}

export default Init
