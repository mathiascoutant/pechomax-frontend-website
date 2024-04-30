import { SyntheticEvent, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import useCreateSpecies from '../../hooks/species/useCreateSpecies'

const CreateSpecies: React.FC = () => {
  const { mutate, isSuccess } = useCreateSpecies()

  const handleCreateSpecies = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      name: data.get('name')?.toString() ?? '',
      pointValue: Number(data.get('pointValue')),
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/listSpecies" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
            <form onSubmit={handleCreateSpecies}>
                <input type="text" name="name" placeholder="name" />
                <input type="text" name="pointValue" placeholder="pointValue" />
                <input type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSpecies
