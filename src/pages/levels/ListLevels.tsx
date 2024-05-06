import useLevelsList from '../../hooks/levels/useLevelsList'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/Form/Button'
import { LevelListItem } from '../../components/LevelListItem'
import Container from '../../components/Container'

function ListLevels() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: levelslist, isError, isSuccess } = useLevelsList(Number(searchParam.get('page') ?? 1))

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
          <LevelListItem id="Identifiant" value="Niveaux" start="Début" end="Fin" title="Titre" links={false} />
        </>
      }
      footer={
        <Link to="/levels/create">
          <Button>Créer</Button>
        </Link>
      }
    >
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        levelslist.map((level, i) => (
          <LevelListItem
            id={level.id}
            value={level.value}
            start={level.start}
            end={level.end}
            title={level.title}
            key={level.id}
            darker={i % 2 === 0}
          />
        ))}
    </Container>
  )
}

export default ListLevels
