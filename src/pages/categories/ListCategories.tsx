import useCategorieList from '../../hooks/categories/useCategoriesList'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../../components/Container'
import { Button } from '../../components/Form/Button'
import { CategoriesListItem } from '../../components/CategoriesListItem'

function ListCategories() {
  const [searchParam, setSearchParams] = useSearchParams()
  const { data: categorieList, isError, isSuccess } = useCategorieList(Number(searchParam.get('page') ?? 1))

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
          <CategoriesListItem id="Identifiant" name="Nom" links={false} />
        </>
      }
      footer={
        <Link to="/categories/create">
          <Button>Créer</Button>
        </Link>
      }
    >
      {isError && <span>Une erreur s'est produite, veuillez réessayer</span>}
      {isSuccess &&
        categorieList.map((cat, i) => (
          <CategoriesListItem id={cat.id} name={cat.name} key={cat.id} darker={i % 2 === 0} />
        ))}
    </Container>
  )
}

export default ListCategories
