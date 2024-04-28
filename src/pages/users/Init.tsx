import { SyntheticEvent, useCallback } from 'react'
import useInit from '../../hooks/auth/useInit'
import { Navigate } from 'react-router-dom'

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
        <div className="mx-auto mt-10">
          <form onSubmit={handleInit}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="S'enregistrer" />
          </form>
        </div>
        {isError && <span className="text-red-800">{error?.response?.data.message}</span>}
      </div>
    </>
  )
}

export default Init
