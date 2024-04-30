import { SyntheticEvent, useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useUser from '../../hooks/users/useUser'
import useUpdateUser from '../../hooks/users/useUpdateUser'
import { useQueryClient } from '@tanstack/react-query'
import type { User } from '../../types/user'

function UpdateUser() {
  const { username } = useParams<{ username: string }>()
  const queryClient = useQueryClient()
  const { data: user, isLoading, isSuccess, isError } = useUser(username ?? '')
  const { mutate, isSuccess: mutationSuccess } = useUpdateUser()

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      formData.set('id', user?.id?.toString() ?? '')

      mutate(formData)

      queryClient.setQueryData(['user', username ?? ''], (old: User) => ({ ...old, ...formData }))
    },
    [user]
  )

  if (mutationSuccess) {
    return <Navigate to="/users" />
  }

  return (
    <>
      <div className="w-9/12 mx-auto mt-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching user</p>}
        {isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-100 p-3 grid grid-cols-2 gap-20">
              <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                <div className="w-fit">
                  <p className="mb-4">Username:</p>
                  <p className="mb-4">Email:</p>
                  <p className="mb-4">Téléphone:</p>
                  <p className="mb-4">Ville:</p>
                  <p className="mb-4">Région:</p>
                </div>
                <div>
                  <input
                    className="mb-4"
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    placeholder="Username"
                  />
                  <input className="mb-4" type="email" name="email" defaultValue={user.email} placeholder="Email" />
                  <input
                    className="mb-4"
                    type="phone"
                    name="phoneNumber"
                    defaultValue={user.phoneNumber ?? ''}
                    placeholder="Téléphone"
                  />
                  <input className="mb-4" type="text" name="city" defaultValue={user.city ?? ''} placeholder="Ville" />
                  <input
                    className="mb-4"
                    type="text"
                    name="region"
                    defaultValue={user.region ?? ''}
                    placeholder="Département"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 bg-white rounded-md w-fit p-2 gap-4">
                <div>
                  <p className="mb-4">Role:</p>
                  <p className="mb-4">Création:</p>
                  <p className="mb-4">Score:</p>
                  <p className="mb-4">Niveau:</p>
                </div>
                <div>
                  <input
                    className="mb-4"
                    type="text"
                    name="role"
                    defaultValue={user.role}
                    placeholder="Role"
                  />
                  <p className="mb-4">{user.createdAt}</p>
                  <input className="mb-4" type="text" name="score" defaultValue={user.score} placeholder="Score" />
                  <input className="mb-4" type="text" name="level" defaultValue={'1'} placeholder="Niveau" disabled />
                  <button type="submit">Modifier</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UpdateUser
