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
    <div className='w-10 mt-2 ml-2 hover:cursor-pointer '>
      <a href="/catches/create">
        <img src="/src/assets/images/plus.png" alt="" />
      </a>
    </div>
      <div className="flex flex-cols-2 w-screen p-2">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              catchesList.map((catches, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {catches.id}</p>
                  <a className="flex items-center justify-center hover:text-[#1f4f42] hover:bg-[#A7C4E4]" href={`./catches/update/${catches.id}`}>
                    <p>Modifier</p>
                  </a>
                  <button className="hover:text-red-700 hover:bg-[#d4f8d7]" onClick={() => handleConversationDelete(catches.id)}>
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
