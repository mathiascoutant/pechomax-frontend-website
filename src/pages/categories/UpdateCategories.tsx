import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useCategorie from '../../hooks/categories/useCategories'
import useUpdateCategorie from '../../hooks/categories/useUpdateCategories'
import { Categorie } from '../../types/categorie'

function UpdateCategorie() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: categorie, isLoading, isSuccess, isError } = useCategorie(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateCategorie()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: categorie?.id ?? '',
        name: formData.get('name')?.toString(),
      }

      mutate(putData)

      queryClient.setQueryData(['categorie', categorie ?? ''], (old: Categorie) => ({ ...old, ...putData }))
    },
    [categorie]
  )

  if (mutationSuccess) {
    return <Navigate to="/categories" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Categories</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Name:</p>
                </div>
                <div>
                  <p className="mb-4">{categorie.id}</p>
                  <input
                    className="mb-4"
                    type="text"
                    name="name"
                    defaultValue={categorie.name}
                    placeholder="Name"
                  />
                </div>
                <button>Modifier</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UpdateCategorie
