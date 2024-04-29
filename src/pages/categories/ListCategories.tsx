import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Categorie } from '../../types/categorie'
import useCategorieList from '../../hooks/categories/useCategoriesList'
import useDeleteCategorie from '../../hooks/categories/useDeleteCategories'

function ListCategories() {
  const queryClient = useQueryClient()
  const { data: categorieList, isError, isSuccess } = useCategorieList()
  const { mutate } = useDeleteCategorie()

  const handleCategorieDelete = useCallback((categorieId: string) => {
    mutate({ id: categorieId })

    queryClient.setQueryData(['category-list'], (old: Categorie[]) => old.filter((categorie) => categorie.id !== categorieId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              categorieList.map((categorie, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>id: {categorie.id}</p>
                  <p>Name: {categorie.name}</p>
                  <a className="text-center" href={`./categories/update/${categorie.id}`}>
                    Modifier
                  </a>
                  <button className="text-right hover:bg-red-700 w-fit" onClick={() => handleCategorieDelete(categorie.id)}>
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

export default ListCategories
