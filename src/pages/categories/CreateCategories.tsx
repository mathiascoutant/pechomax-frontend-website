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
      <div className='w-full'>
        <div className="w-full">
          <div className="mt-10 flex items-center justify-center">
            <form className='grid grid-cols-1 p-2 m-2 bg-[#aeaeae] text-center' onSubmit={handleCreateCategorie}>
                <input className='m-2' type="text" name="name" placeholder="name" />
                <input className='bg-[#d4f8d7]' type="submit" value="S'enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateConversation
