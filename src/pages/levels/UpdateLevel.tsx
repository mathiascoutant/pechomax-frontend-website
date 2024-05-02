import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useLevels from '../../hooks/levels/useLevels'
import useUpdateLevels from '../../hooks/levels/useUpdateLevels'
import { Levels } from '../../types/levels'

function UpdateLevel() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data: levels, isLoading, isSuccess, isError } = useLevels(id ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateLevels()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const putData = {
        id: levels?.id ?? '',
        title: formData.get('title')?.toString(),
        value: Number(formData.get('value')),
        start: Number(formData.get('start')),
        end: Number(formData.get('end')),
      }

      mutate(putData)

      queryClient.setQueryData(['levels', levels ?? ''], (old: Levels) => ({ ...old, ...putData }))
    },
    [levels]
  )

  if (mutationSuccess) {
    return <Navigate to="/levels" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching Levels</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Id:</p>
                  <p className="mb-4">Title:</p>
                  <p className="mb-4">value:</p>
                  <p className="mb-4">Start:</p>
                  <p className="mb-4">End:</p>
                </div>
                <div>
                  <p className="mb-4">{levels.id}</p>
                  <input
                    className="mb-4"
                    type="text"
                    name="title"
                    defaultValue={levels.title}
                    placeholder="Title"
                  />{' '}
                  <br />
                  <input className="mb-4" type="number" name="value" placeholder="value" value={levels.value} />
                  <br />
                  <input className="mb-4" type="number" name="start" placeholder="start" value={levels.start} />
                  <br />
                  <input className="mb-4" type="number" name="end" placeholder="end" value={levels.end} />
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

export default UpdateLevel
