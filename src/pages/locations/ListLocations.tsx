import useLocationList from '../../hooks/locations/useLocationList'
import Container from '../../components/Container'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/Form/Button'
import { LocationListItem } from '../../components/LocationListItem'

function ListLocations() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: locationList, isLoading, isError, isSuccess } = useLocationList(Number(searchParam.get('page') ?? 1))

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
          <LocationListItem id="Identifiant" latitude="Latitude" longitude="Longitude" name="Nom" links={false} />
        </>
      }
      footer={
        <Link to="/locations/create">
          <Button>Créer</Button>
        </Link>
      }
    >
      {isLoading && <span>Chargement...</span>}
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        locationList.map((location, i) => (
          <LocationListItem
            id={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            name={location.name}
            key={location.id}
            darker={i % 2 === 0}
          />
        ))}
    </Container>
  )
}

export default ListLocations
