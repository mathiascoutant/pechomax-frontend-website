import { SyntheticEvent, useCallback } from 'react'
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
      <div className="w-full">
        <div className="w-full">
          <div className="mt-10 flex items-center justify-center">
            {isError && <p>Error fetching Conversations</p>}
            <form className="grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center" onSubmit={handleCreateConversation}>
              <input className="m-2" type="text" name="title" placeholder="Title" />
              <select className="m-2" name="categoryId">
                {isCategorySuccess &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <input className="bg-[#d4f8d7]" type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateConversation
