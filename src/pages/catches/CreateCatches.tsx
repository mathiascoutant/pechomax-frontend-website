import { SyntheticEvent, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import useCreateCatches from '../../hooks/catches/useCreateCatches'
import useSpeciesList from '../../hooks/species/useSpeciesList'

const CreateCatches: React.FC = () => {
  const { mutate, isError, error, isSuccess } = useCreateCatches()
  const { data: species, isSuccess: isSpeciesSuccess } = useSpeciesList()

  const handleCreateCatches = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      weight: data.get('weight')?.toString() ?? '',
      length: data.get('length')?.toString() ?? '',
      speciesId: data.get('speciesId')?.toString() ?? '',
      localisation: data.get('localisation')?.toString() ?? '',
      description: data.get('description')?.toString() ?? '',
      date : new Date().toISOString()
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
              {isError && <p>Error fetching Conversations</p>}
                <form onSubmit={handleCreateCatches}>
                  <input type="text" name="weight" placeholder="weight" />
                  <input type="text" name="length" placeholder="length" />
                  <select name="speciesId" id="pet-select">
                  {isSpeciesSuccess &&
                    species.map((species, index) => (
                      <option key={index} value={species.id}>
                        {species.name}
                      </option>
                    ))}
                  </select>
                  <input type="text" name="localisation" placeholder="localisation" />
                  <input type="text" name="description" placeholder="description" />
                  <input type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCatches
