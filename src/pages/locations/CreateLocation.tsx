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
      <div className='w-full'>
        <div className="w-full">
          <div className="mt-10 flex items-center justify-center">
              {isError && <p>Error fetching Location</p>}
                <form className='grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center' onSubmit={handleCreateLocation}>
                  <input className='m-2' type="text" name="name" placeholder="Name" />
                  <input className='m-2' type="text" name='longitude' placeholder="Longitude" />
                  <input className='m-2' type="text" name='latitude' placeholder="Latitude" />
                  <input className='m-2' type="text" name='description' placeholder="description" />
                  <input className='m-2 bg-[#d4f8d7]' type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateLocation
