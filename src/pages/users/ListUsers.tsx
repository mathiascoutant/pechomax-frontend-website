import { useCallback } from 'react'
import useDeleteUser from '../../hooks/users/useDeleteUser'
import useUserList from '../../hooks/users/useUserList'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '../../types/user'

function ListUsers() {
  const queryClient = useQueryClient()
  const { data: userList, isError, isSuccess } = useUserList()
  const { mutate } = useDeleteUser()

  const handleUserDelete = useCallback((userId: string) => {
    mutate({ id: userId })

    queryClient.setQueryData(['user-list'], (old: User[]) => old.filter((user) => user.id !== userId))
  }, [])

  return (
    <>
      <div className="flex flex-cols-2 w-full">
        <div className="mx-auto mt-10">
          <div className="bg-slate-100 p-3">
            {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
            {isSuccess &&
              userList.map((user, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto">
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <a className="text-center" href={`./users/${user.username}`}>
                    Voir
                  </a>
                  <a className="flex items-center justify-center hover:text-[#1f4f42] hover:bg-[#A7C4E4]" href={`./users/update/${user.username}`}>
                    <p>Modifier</p>
                  </a>
                  <button className="hover:text-red-700 hover:bg-[#d4f8d7]" onClick={() => handleUserDelete(user.id)}>
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

export default ListUsers
