import { SyntheticEvent, useCallback} from 'react'
import { Navigate } from 'react-router-dom'
import useCreateLevels from '../../hooks/levels/useCreateLevels'

const CreateLevel: React.FC = () => {
  const { mutate, isError, isSuccess } = useCreateLevels()

  const handleCreateLevel = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      title: data.get('title')?.toString() ?? '',
      value: Number(data.get('value')),
      start: Number(data.get('start')),
      end: Number(data.get('end')),
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/levels" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
              {isError && <p>Error fetching Levels</p>}
                <form onSubmit={handleCreateLevel}>
                  <input type="text" name="title" placeholder="Title" />
                  <input type="number" name='Value' placeholder="Value" />
                  <input type="number" name='start' placeholder="Start" />
                  <input type="number" name='end' placeholder="End" />
                  <input type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateLevel
