import useCatchesList from '../../hooks/catches/useCatchesList'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { Link, useSearchParams } from 'react-router-dom'
import { CatchesListItem } from '../../components/CatchesListItem'

function ListCatches() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: catchesList, isError, isSuccess, isLoading } = useCatchesList(Number(searchParam.get('page') ?? 1))

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
          <CatchesListItem id="Identifiant" length="Taille" weight="Poids" pointValue="Valeur" links={false} />
        </>
      }
      footer={
        <Link to="/catches/create">
          <Button>Créer</Button>
        </Link>
      }
    >
      {isLoading && <span>Chargement...</span>}
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        catchesList.map((catches, i) => (
          <CatchesListItem
            id={catches.id}
            length={catches.length}
            weight={catches.weight}
            pointValue={catches.pointValue}
            key={catches.id}
            darker={i % 2 === 0}
          />
        ))}
    </Container>
  )
}

export default ListCatches
