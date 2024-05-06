import useSpeciesList from '../../hooks/species/useSpeciesList'
import Container from '../../components/Container'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/Form/Button'
import { SpeciesListItem } from '../../components/SpeciesListItem'

function ListSpecies() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: speciesList, isError, isSuccess } = useSpeciesList(Number(searchParam.get('page') ?? 1))

  return (
    <Container
      header={
        <>
          <Link to="/species/create">
            <Button>Ajouter +</Button>
          </Link>
          <SpeciesListItem name="Nom de l'espece" links={false} id="Identifiant" />
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
        speciesList.map((species, i) => (
          <SpeciesListItem id={species.id} name={species.name} darker={i % 2 === 0} key={species.id} />
        ))}
    </Container>
  )
}

export default ListSpecies
