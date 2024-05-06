import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { UserListItem } from '../components/UserListItem'
import useConversationList from '../hooks/conversations/useConversationList'
import useUserList from '../hooks/users/useUserList'
import { Button } from '../components/Form/Button'
import { ConversationListItem } from '../components/ConversationListItem'

export default function Home() {
  const { data: userList, isLoading: userIsLoading, isError: userIsError, isSuccess: userIsSuccess } = useUserList()
  const {
    data: convList,
    isLoading: convIsLoading,
    isError: convIsError,
    isSuccess: convIsSuccess,
  } = useConversationList()
  return (
    <div className="flex justify-around">
      <Container
        header={<h1 className="font-bold">Derniers Utilisateurs</h1>}
        footer={
          <Link to="/users">
            <Button>Voir Plus</Button>
          </Link>
        }
      >
        {userIsLoading && <span>Loading...</span>}
        {userIsError && <span>Error fetching Users</span>}
        {userIsSuccess &&
          userList.map((user, i) => (
            <UserListItem
              email={user.email}
              id={user.id}
              profilePic={user.profilePic ?? ''}
              username={user.username}
              links={false}
              darker={i % 2 === 0}
              key={user.id}
            />
          ))}
      </Container>
      <Container
        header={<h1 className="font-bold">Dernieres Conversations</h1>}
        footer={
          <Link to="/conversations">
            <Button>Voir Plus</Button>
          </Link>
        }
      >
        {convIsLoading && <span>Loading...</span>}
        {convIsError && <span>Error fetching Conversations</span>}
        {convIsSuccess &&
          convList.map((conv, i) => (
            <ConversationListItem id={conv.id} title={conv.title} links={false} darker={i % 2 === 0} key={conv.id} />
          ))}
      </Container>
    </div>
  )
}
