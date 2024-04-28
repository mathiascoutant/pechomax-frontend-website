import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useUserStore } from '../../stores/UserStore'
import { useParams } from 'react-router-dom'

interface LocationData {
  id: string
  longitude: string
  latitude: string
  name: string
  description: string | null
  userId: string
  createdAt: string
  updatedAt: string
}

function UpdateMessage() {
  const _ = useUserStore()
  const { id } = useParams<{ id: string }>()
  const [locations, setLocation] = useState<LocationData | null>(null)

  useEffect(() => {
    const fetchid = async () => {
      try {
        const response = await axios.get<LocationData>(`http://localhost:3000/locations/${id}`, {
          withCredentials: true,
        })
        setLocation(response.data)
      } catch (error) {
        console.error('Error fetching location:', error)
      }
    }

    fetchid()
  }, [id])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(`http://localhost:3000/locations/update/${locations?.id}`, locations, {
        withCredentials: true,
      })
      console.log('Location updated:', response.data)
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setLocation(response.data)
      window.location.href = '/listLocations'
    } catch (error) {
      console.error('Error updating location:', error)
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
              <div className="bg-slate-100 p-3 grid grid-cols-1 gap-20">
                <div className="grid grid-cols-2 bg-white rounded-md  p-2 gap-4">
                  <div className="w-fit">
                    <p className="mb-4">Id:</p>
                    <p className="mb-4">Longitude:</p>
                    <p className="mb-4">Latitude:</p>
                    <p className="mb-4">Name:</p>
                    <p className="mb-4">Description:</p>
                    <p className="mb-4">UserId:</p>
                    <p className="mb-4">CreatedAt:</p>
                    <p className="mb-4">UpdatedAt:</p>
                  </div>
                  {locations && (
                    <div>
                      <p className="mb-4">{locations.id ?? ''}</p>
                      <p className="mb-4">{locations.longitude ?? ''}</p>
                      <p className="mb-4">{locations.latitude ?? ''}</p>
                      <input
                        className="mb-4"
                        type="text"
                        value={locations.name ?? ''}
                        placeholder="name"
                        onChange={(e) => setLocation({ ...locations, name: e.target.value })}
                      />{' '}
                      <br />
                      <input
                        className="mb-4"
                        type="text"
                        value={locations.description ?? ''}
                        placeholder="description"
                        onChange={(e) => setLocation({ ...locations, description: e.target.value })}
                      />
                      <p className="mb-4">{locations.userId ?? ''}</p>
                      <p className="mb-4">{locations.createdAt ?? ''}</p>
                      <p className="mb-4">{locations.updatedAt ?? ''}</p>
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

export default UpdateMessage
