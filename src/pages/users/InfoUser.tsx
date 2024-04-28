import { useParams } from 'react-router-dom'
import useUser from '../../hooks/users/useUser'

function ListUsers() {
  const { username } = useParams<{ username: string }>()
  const { data: user, isLoading, isError, isSuccess } = useUser(username ?? '')

  return (
    <>
      <div className="mx-auto mt-10">
        <div className="bg-slate-100 p-3 grid grid-cols-2 gap-20">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching user</p>}
          {isSuccess && (
            <div>
              <p>Id: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Téléphone: {user.phoneNumber}</p>
              <p>Role: {user.role}</p>
              <p>Score: {user.score}</p>
              <p>Date de création: {user.createdAt}</p>
              <p>Date de mise à jour: {user.updatedAt}</p>
              <p>Ville: {user.city}</p>
              <p>Région: {user.region}</p>
              <p>Code postal: {user.zipCode}</p>
              <p>Photo de profil: {user.profilePic}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ListUsers
