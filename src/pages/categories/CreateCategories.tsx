import { SyntheticEvent, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import useCreateCategorie from '../../hooks/categories/useCreateCategories'

const CreateConversation: React.FC = () => {
  const { mutate, isSuccess } = useCreateCategorie()

  const handleCreateCategorie = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      name: data.get('name')?.toString() ?? '',
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/categories" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
            <form onSubmit={handleCreateCategorie}>
                <input type="text" name="name" placeholder="name" />
                <input type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateConversation
