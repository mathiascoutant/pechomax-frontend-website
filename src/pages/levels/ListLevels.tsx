import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useLevelsList from '../../hooks/levels/useLevelsList'
import useDeleteLevels from '../../hooks/levels/useDeleteLevels'
import { Levels } from '../../types/levels'

function ListLevels() {
  const queryClient = useQueryClient()
  const { data: levelslist, isError, isSuccess } = useLevelsList()
  const { mutate } = useDeleteLevels()

  const handleLevelDelete = useCallback((levelId: string) => {
    mutate({ id: levelId })

    queryClient.setQueryData(['level-list'], (old: Levels[]) => old.filter((level) => level.id !== levelId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              levelslist.map((level, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {level.id}</p>
                  <p>Title: {level.title}</p>
                  <a className="text-center" href={`./levels/update/${level.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleLevelDelete(level.id)}>
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

export default ListLevels
