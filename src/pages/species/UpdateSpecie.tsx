import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useSpecies from '../../hooks/species/useSpecies'
import useUpdateSpecies from '../../hooks/species/useUpdateSpecies'
import { Species } from '../../types/species'
function UpdateSpecies() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: species, isLoading, isSuccess, isError } = useSpecies(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateSpecies()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: species?.id ?? '',
        name: formData.get('name')?.toString(),
        pointValue: Number(formData.get('pointValue')),
      }

      mutate(putData)

      queryClient.setQueryData(['species', species ?? ''], (old: Species) => ({ ...old, ...putData }))
    },
    [species]
  )

  if (mutationSuccess) {
    return <Navigate to="/species" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Species</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Name:</p>
                  <p className="mb-4">Point Value:</p>
                </div>
                <div>
                  <p className="mb-4">{species.id}</p>
                  <input className="mb-4" type="text" name="name" defaultValue={species.name} placeholder="Name" />{' '}
                  <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="pointValue"
                    defaultValue={species.pointValue}
                    placeholder="pointValue"
                  />
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

export default UpdateSpecies
