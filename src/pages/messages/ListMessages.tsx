import useMessagesList from '../../hooks/messages/useMessagesList'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { Link, useSearchParams } from 'react-router-dom'
import { MessageListItem } from '../../components/MessageListItem'

function ListMessages() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: messageList, isError, isSuccess } = useMessagesList(Number(searchParam.get('page') ?? 1))

  return (
    <Container
      header={
        <>
          <Link to="/messages/create">
            <Button>Créer</Button>
          </Link>
          <MessageListItem content="Contenu" id="Identifiant" links={false} />
        </>
      }
      footer={
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
      }
    >
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        messageList.map((message, i) => (
          <MessageListItem content={message.content} id={message.id} key={message.id} darker={i % 2 === 0} />
        ))}
    </Container>
  )
}

export default ListMessages
