import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useUserStore } from '../../stores/UserStore'
import { useParams } from 'react-router-dom'

interface CatchsData {
  id: string
  userId: string
  length: string
  weight: string
  speciesId: string
  localisation: string
  pictures: string
  description: string
  pointValue: string
  date: string
}

function UpdateCategorie() {
  const _ = useUserStore()
  const { id } = useParams<{ id: string }>()
  const [catches, setCatch] = useState<CatchsData | null>(null)

  useEffect(() => {
    const fetchid = async () => {
      try {
        const response = await axios.get<CatchsData>(`http://localhost:3000/catches/${id}`, { withCredentials: true })
        setCatch(response.data)
      } catch (error) {
        console.error('Error fetching catch:', error)
      }
    }

    fetchid()
  }, [id])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(
        `http://localhost:3000/catches/update/${catches?.id}`,
        { ...catches, date: new Date(catches?.date ?? '').toISOString() },
        { withCredentials: true }
      )
      console.log('Catch updated:', response.data)
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setCatch(response.data)
      window.location.href = '/listCatches'
    } catch (error) {
      console.error('Error updating catch:', error)
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
                    <p className="mb-4">Name:</p>
                    <p className="mb-4">Length:</p>
                    <p className="mb-4">Weight:</p>
                    <p className="mb-4">SpeciesId:</p>
                    <p className="mb-4">Localisation:</p>
                    <p className="mb-4">Description:</p>
                    <p className="mb-4">PointValue:</p>
                    <p className="mb-4">Date:</p>
                  </div>
                  {catches && (
                    <div>
                      <p>{catches.id ?? ''}</p>
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.userId ?? ''}
                        placeholder="user_id"
                        onChange={(e) => setCatch({ ...catches, userId: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.length ?? ''}
                        placeholder="length"
                        onChange={(e) => setCatch({ ...catches, length: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.weight ?? ''}
                        placeholder="weight"
                        onChange={(e) => setCatch({ ...catches, weight: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.speciesId ?? ''}
                        placeholder="speciesId"
                        onChange={(e) => setCatch({ ...catches, speciesId: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.localisation ?? ''}
                        placeholder="localisation"
                        onChange={(e) => setCatch({ ...catches, localisation: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.description ?? ''}
                        placeholder="description"
                        onChange={(e) => setCatch({ ...catches, description: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="text"
                        value={catches.pointValue ?? ''}
                        placeholder="pointValue"
                        onChange={(e) => setCatch({ ...catches, pointValue: e.target.value })}
                      />
                      <input
                        className="mb-4"
                        type="date"
                        value={catches.date ?? ''}
                        placeholder="date"
                        onChange={(e) => setCatch({ ...catches, date: e.target.value })}
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

export default UpdateCategorie
