import { SyntheticEvent, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import useCreateCatches from '../../hooks/catches/useCreateCatches'
import useSpeciesList from '../../hooks/species/useSpeciesList'

const CreateCatches: React.FC = () => {
  const { mutate, isError, isSuccess } = useCreateCatches()
  const { data: species, isSuccess: isSpeciesSuccess } = useSpeciesList()

  const handleCreateCatches = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    mutate(data)
  }, [])

  if (isSuccess) {
    return <Navigate to="/catches" />
  }

  return (
    <>
      <div className="w-full ">
        <div className="w-full">
          <div className="mt-10 flex items-center justify-center">
            {isError && <p>Error fetching Catches</p>}
            <form className="grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center" onSubmit={handleCreateCatches}>
              <input className="m-2" type="text" name="weight" placeholder="weight" />
              <input className="m-2" type="text" name="length" placeholder="length" />
              <select className="m-2" name="speciesId" id="pet-select">
                {isSpeciesSuccess &&
                  species.map((species, index) => (
                    <option key={index} value={species.id}>
                      {species.name}
                    </option>
                  ))}
              </select>
              <input className="m-2" type="text" name="localisation" placeholder="localisation" />
              <input className="m-2" type="text" name="description" placeholder="description" />
              <input className="m-2" type="date" name="date" placeholder="date" />
              <input className="bg-[#d4f8d7] m-2" type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCatches
