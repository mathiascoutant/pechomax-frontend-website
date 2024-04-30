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
    <div className='w-10 mt-2 ml-2 hover:cursor-pointer '>
      <a href="/levels/create">
        <img src="/src/assets/images/plus.png" alt="" />
      </a>
    </div>
      <div className="flex flex-cols-2 w-screen p-2">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              levelslist.map((level, index) => (
                <div key={index} className="grid grid-cols-4 gap-3 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {level.id}</p>
                  <p>Title: {level.title}</p>
                  <a className="flex items-center justify-center hover:text-[#1f4f42] hover:bg-[#A7C4E4]" href={`./levels/update/${level.id}`}>
                    <p>Modifier</p>
                  </a>
                  <button className="hover:text-red-700 hover:bg-[#d4f8d7]" onClick={() => handleLevelDelete(level.id)}>
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
