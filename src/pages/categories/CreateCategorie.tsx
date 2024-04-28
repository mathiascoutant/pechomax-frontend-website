import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import axios from 'axios'

const CreateCategorie: React.FC = () => {
  const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const returnData: { name: string | null } = {
      name: data.get('name') as string | null,
    }
    axios
      .post('http://localhost:3000/categories/create', returnData, { withCredentials: true })
      .then((response) => {
        window.location.href = '/listCategories'
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
              <input type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCategorie
