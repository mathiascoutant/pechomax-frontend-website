import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useLocations from '../../hooks/locations/useLocations'
import useUpdateLocation from '../../hooks/locations/useUpdateLocation'

function UpdateLocation() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: locations, isLoading, isSuccess, isError } = useLocations(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateLocation()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: locations?.id ?? '',
        name: formData.get('name')?.toString(),
        latitude: formData.get('latitude')?.toString(),
        longitude: formData.get('longitude')?.toString(),
        description: formData.get('description')?.toString(),
      }

      mutate(putData)

      queryClient.setQueryData(['locations', locations ?? ''], (old: Location) => ({ ...old, ...putData }))
    },
    [locations]
  )

  if (mutationSuccess) {
    return <Navigate to="/locations" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Locations</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Name:</p>
                  <p className="mb-4">Latitude:</p>
                  <p className="mb-4">Longitude:</p>
                  <p className="mb-4">Description:</p>
                  <p className="mb-4">UserId</p>
                  <p className="mb-4">Date de creation</p>
                  <p className="mb-4">Date de modification</p>
                </div>
                <div>
                  <p className="mb-4">{locations.id}</p>
                  <input className="mb-4" type="text" name="name" defaultValue={locations.name} placeholder="Name" />
                  <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="latitude"
                    placeholder="latitude"
                    defaultValue={locations.latitude}
                  />
                  <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="longitude"
                    placeholder="longitude"
                    defaultValue={locations.longitude}
                  />
                  <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="description"
                    placeholder="description"
                    defaultValue={locations.description}
                  />{' '}
                  <br />
                  <p className="mb-4">{locations.userId}</p>
                  <p className="mb-4">{locations.createdAt}</p>
                  <p className="mb-4">{locations.updatedAt}</p>
                </div>
                <button className="bg-[#A7C4E4] w-fit p-1">Modifier</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UpdateLocation
