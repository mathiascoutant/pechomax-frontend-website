import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import axios from 'axios'

const CreateSpecie: React.FC = () => {
  const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const returnData: { name: string | null; pointValue: number | null } = {
      name: data.get('name') as string | null,
      pointValue: Number(data.get('pointValue')) as number | null,
    }
    axios
      .post('http://localhost:3000/species/create', returnData, { withCredentials: true })
      .then((response) => {
        window.location.href = '/listSpecies'
        return response.data
      })
      .catch((error) => {
        return error
      })
  }

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-cols-2 w-full">
          <NavBar />
          <div className="mx-auto mt-10">
            <form onSubmit={handleInit}>
              <input type="text" name="name" placeholder="Name" />
              <input type="number" name="pointValue" placeholder="Point value" />
              <input type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSpecie
