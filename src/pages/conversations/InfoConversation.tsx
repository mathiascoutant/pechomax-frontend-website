import React, { useState, useEffect } from 'react'
import AxosClient from '../../helpers/axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom'

// Interface décrivant la structure des données utilisateur
interface ConversationseData {
  id: string
  user_id: string
  title: string
  category_id: string
  created_at: string
  updated_at: string
}

function UpdateConversation() {
  const { id } = useParams<{ id: string }>()
  const [conversation, setConversations] = useState<ConversationseData | null>(null)

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await AxosClient.get<ConversationseData>(`/conversations/${id}`, {
          withCredentials: true,
        })
        setConversations(response.data)
      } catch (error) {
        console.error('Error fetching conversation:', error)
      }
    }

    fetchConversation()
  }, [id]) // Ajouter conversation comme dépendance pour que useEffect soit déclenché à chaque changement du paramètre id

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await AxosClient.put(`/conversations/update/${conversation?.id}`, conversation, {
        withCredentials: true,
      })
      console.log('Conversation updated:', response.data)
      // Mettre à jour l'état local de la conversation avec les nouvelles données si la mise à jour est réussie
      setConversations(response.data)
      window.location.href = '/listConversations'
    } catch (error) {
      console.error('Error updating conversation:', error)
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-cols-2 w-full">
          <NavBar />
          <div className="w-9/12 mx-auto mt-10">
            <form onSubmit={handleSubmit}>
              <div className="bg-slate-100 p-3 grid grid-cols-2 gap-20">
                <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                  <div className="w-fit">
                    <p className="mb-4">Id:</p>
                    <p className="mb-4">Title:</p>
                  </div>
                  {conversation && (
                    <div>
                      <p>{conversation.id ?? ''}</p>
                      <input
                        className="mb-4"
                        type="text"
                        value={conversation.title ?? ''}
                        placeholder="Title"
                        onChange={(e) => setConversations({ ...conversation, title: e.target.value })}
                      />
                    </div>
                  )}
                  <button type="submit">Modifier</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateConversation
