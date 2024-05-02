import { SyntheticEvent, useCallback } from 'react'
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
      <div className="w-full">
        <div className="w-full">
          <div className="mt-10 flex items-center justify-center">
            {isError && <p>Error fetching Levels</p>}
            <form className="grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center" onSubmit={handleCreateLevel}>
              <input className="m-2" type="text" name="title" placeholder="Title" />
              <input className="m-2" type="number" name="Value" placeholder="Value" />
              <input className="m-2" type="number" name="start" placeholder="Start" />
              <input className="m-2" type="number" name="end" placeholder="End" />
              <input className="m-2 bg-[#d4f8d7]" type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateLevel
