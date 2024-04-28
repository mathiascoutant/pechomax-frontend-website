import { SyntheticEvent } from 'react'
import useInit from '../../hooks/useInit'

const Init: React.FC = () => {
  const { mutate } = useInit()
  const handleInit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const returnData = {
      username: data.get('username')?.toString() ?? '',
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
    }

    mutate(returnData)
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
      </div>
    </>
  )
}

export default Init
