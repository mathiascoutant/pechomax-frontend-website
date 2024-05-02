import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useDeleteLocation from '../../hooks/locations/useDeleteLocation'
import { Location } from '../../types/locations'
import useLocationList from '../../hooks/locations/useLocationList'

function ListLocations() {
  const queryClient = useQueryClient()
  const { data: locationList, isError, isSuccess } = useLocationList()
  const { mutate } = useDeleteLocation()

  const handleLocationDelete = useCallback((locationId: string) => {
    mutate({ id: locationId })

    queryClient.setQueryData(['location-list'], (old: Location[]) =>
      old.filter((location) => location.id !== locationId)
    )
  }, [])

  return (
    <>
      <div className="w-10 mt-2 ml-2 hover:cursor-pointer ">
        <a href="/locations/create">
          <img src="/src/assets/images/plus.png" alt="" />
        </a>
      </div>
      <div className="flex flex-cols-2 w-screen p-2">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              locationList.map((location, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {location.id}</p>
                  <p>Name: {location.name}</p>
                  <a
                    className="flex items-center justify-center hover:text-[#1f4f42] hover:bg-[#A7C4E4]"
                    href={`./locations/update/${location.id}`}
                  >
                    <p>Modifier</p>
                  </a>
                  <button
                    className="hover:text-red-700 hover:bg-[#d4f8d7]"
                    onClick={() => handleLocationDelete(location.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListLocations
