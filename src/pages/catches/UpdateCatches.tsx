import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Catches } from '../../types/catches'
import useCatches from '../../hooks/catches/useCatches'
import useUpdateCatches from '../../hooks/catches/useUpdateCatches'

function UpdateCatches() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: catches, isLoading, isSuccess, isError } = useCatches(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateCatches()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      formData.set('id', id?.toString() ?? '')

      mutate(formData)

      queryClient.setQueryData(['updateCatches', catches ?? ''], (old: Catches) => ({ ...old, ...formData }))
    },
    [catches]
  )

  if (mutationSuccess) {
    return <Navigate to="/catches" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Catches</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Date:</p>
                  <p className="mb-4">Length:</p>
                  <p className="mb-4">Weight:</p>
                  <p className="mb-4">Localisation:</p>
                  <p className="mb-4">Description:</p>
                  <p className="mb-4">pointValue:</p>
                  <p className="mb-4">speciesId</p>
                  <p className="mb-4">UserId:</p>
                </div>
                <div>
                  <p className="mb-4">{catches.id}</p>
                  <p className="mb-4">{catches.date}</p>
                  <input
                    className="mb-4"
                    type="text"
                    name="length"
                    defaultValue={catches.length}
                    placeholder="length"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="weight"
                    defaultValue={catches.weight}
                    placeholder="Weight"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="localisation"
                    defaultValue={catches.localisation}
                    placeholder="Localisation"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="description"
                    defaultValue={catches.description}
                    placeholder="Description"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="pointValue"
                    defaultValue={catches.pointValue}
                    placeholder="PointValue"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="speciesId"
                    defaultValue={catches.speciesId}
                    placeholder="SpeciesId"
                  /> <br />
                  <input
                    className="mb-4"
                    type="text"
                    name="userId"
                    defaultValue={catches.userId}
                    placeholder="UserId"
                  />
                </div>
                <button className='bg-[#A7C4E4] w-fit p-1'>Modifier</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UpdateCatches
