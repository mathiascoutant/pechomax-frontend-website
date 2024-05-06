import useConversationList from '../../hooks/conversations/useConversationList'
import Container from '../../components/Container'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/Form/Button'
import { ConversationListItem } from '../../components/ConversationListItem'

function ListConversations() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: conversationList, isError, isSuccess } = useConversationList(Number(searchParam.get('page') ?? 1))

  return (
    <Container
      footer={
        <Link to="/conversations/create">
          <Button>Créer</Button>
        </Link>
      }
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
          <ConversationListItem id="Identifiant" title="Titre" links={false} />
        </>
      }
    >
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        conversationList.map((conversation, i) => (
          <ConversationListItem
            id={conversation.id}
            title={conversation.title}
            key={conversation.id}
            darker={i % 2 === 0}
          />
        ))}
    </Container>
  )
}

export default ListConversations
