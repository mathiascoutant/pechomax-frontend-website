import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Catches } from '../../types/catches'
import useCatchesList from '../../hooks/catches/useCatchesList'
import useDeleteCatches from '../../hooks/catches/useDeleteCatches'

function ListCatches() {
  const queryClient = useQueryClient()
  const { data: catchesList, isError, isSuccess } = useCatchesList()
  const { mutate } = useDeleteCatches()

  const handleConversationDelete = useCallback((catchesId: string) => {
    mutate({ id: catchesId })

    queryClient.setQueryData(['catches-list'], (old: Catches[]) => old.filter((catches) => catches.id !== catchesId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              catchesList.map((catches, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {catches.id}</p>
                  <a className="text-center" href={`./catches/update/${catches.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleConversationDelete(catches.id)}>
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

export default ListCatches
