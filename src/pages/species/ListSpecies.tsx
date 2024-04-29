import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useSpeciesList from '../../hooks/species/useSpeciesList'
import useDeleteSpecies from '../../hooks/species/useDeleteSpecies'
import { Species } from '../../types/species'

function ListSpecies() {
  const queryClient = useQueryClient()
  const { data: speciesList, isError, isSuccess } = useSpeciesList()
  const { mutate } = useDeleteSpecies()

  const handleSpeciesDelete = useCallback((speciesId: string) => {
    mutate({ id: speciesId })

    queryClient.setQueryData(['species-list'], (old: Species[]) => old.filter((species) => species.id !== speciesId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              speciesList.map((species, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {species.id}</p>
                  <p>Name: {species.name}</p>
                  <a className="text-center" href={`./species/update/${species.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleSpeciesDelete(species.id)}>
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

export default ListSpecies
