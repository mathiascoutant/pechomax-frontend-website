import { SyntheticEvent, useCallback} from 'react'
import { Navigate } from 'react-router-dom'
import useCreateLocation from '../../hooks/locations/useCreateLocation'

const CreateLocation: React.FC = () => {
  const { mutate, isError, isSuccess } = useCreateLocation()

  const handleCreateLocation = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      name: data.get('name')?.toString() ?? '',
      latitude:data.get('latitude')?.toString() ?? '',
      longitude: data.get('longitude')?.toString() ?? '',
      description: data.get('description')?.toString() ?? '',
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/locations" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
              {isError && <p>Error fetching Location</p>}
                <form onSubmit={handleCreateLocation}>
                  <input type="text" name="name" placeholder="Name" />
                  <input type="text" name='longitude' placeholder="Longitude" />
                  <input type="text" name='latitude' placeholder="Latitude" />
                  <input type="text" name='description' placeholder="description" />
                  <input type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateLocation
