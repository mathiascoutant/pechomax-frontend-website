import useUserList from '../../hooks/users/useUserList'
import Container from '../../components/Container'
import { UserListItem } from '../../components/UserListItem'
import { Button } from '../../components/Form/Button'
import { useSearchParams } from 'react-router-dom'

function ListUsers() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: userList, isError, isSuccess } = useUserList(Number(searchParam.get('page') ?? 1))

  return (
    <Container
      header={
        <>
          <div className="flex gap-3 items-center">
            <Button
              onClick={() =>
                setSearchParams((prev) => ({
                  page: Math.max(Number(prev.get('page') ?? '1') - 1, 1).toString(),
                }))
              }
            >
              {'<'}
            </Button>
            <span className="font-bold">{searchParam.get('page') ?? '1'}</span>
            <Button
              onClick={() =>
                setSearchParams((prev) => ({
                  page: (Number(prev.get('page') ?? '1') + 1).toString(),
                }))
              }
            >
              {'>'}
            </Button>
          </div>
          <UserListItem
            profilePic=""
            username="Nom d'utilisateur"
            email="Adresse email"
            img={false}
            links={false}
            id=""
          />
        </>
      }
    >
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        userList.map((user, i) => (
          <UserListItem
            email={user.email}
            profilePic={user.profilePic ?? ''}
            username={user.username}
            key={user.id}
            darker={i % 2 === 0}
            id={user.id}
          />
        ))}
    </Container>
  )
}

export default ListUsers
