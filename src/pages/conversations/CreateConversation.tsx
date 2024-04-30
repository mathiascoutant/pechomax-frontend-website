import { SyntheticEvent, useCallback} from 'react'
import useCreateConversation from '../../hooks/conversations/useCreateConversation'
import { Navigate } from 'react-router-dom'
import useCategorieList from '../../hooks/categories/useCategoriesList'

const CreateConversation: React.FC = () => {
  const { mutate, isError, isSuccess } = useCreateConversation()
  const { data: categories, isSuccess: isCategorySuccess } = useCategorieList()

  const handleCreateConversation = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const postData = {
      title: data.get('title')?.toString() ?? '',
      categoryId: data.get('categoryId')?.toString() ?? '',
    }

    mutate(postData)
  }, [])

  if (isSuccess) {
    return <Navigate to="/conversations" />
  }

  return (
    <>
      <div>
        <div className="flex flex-cols-2 w-full">
          <div className="mx-auto mt-10">
              {isError && <p>Error fetching Conversations</p>}
                <form onSubmit={handleCreateConversation}>
                  <input type="text" name="title" placeholder="Title" />
                  <select name="categoryId" id="pet-select">
                  {isCategorySuccess &&
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input type="submit" value="S'enregistrer" />
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateConversation
