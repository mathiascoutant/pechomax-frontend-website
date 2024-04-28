import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useUserStore } from '../../stores/UserStore'
import { useParams } from 'react-router-dom'

interface SpecieData {
  id: string
  name: string
  pointValue: number
}

function UpdateSpecie() {
  const _ = useUserStore() // ¿Debería utilizarse aquí?
  const { id } = useParams<{ id: string }>()
  const [species, setSpecie] = useState<SpecieData | null>(null)

  useEffect(() => {
    const fetchSpecie = async () => {
      try {
        const response = await axios.get<SpecieData>(`http://localhost:3000/species/${id}`, { withCredentials: true })
        setSpecie(response.data)
      } catch (error) {
        console.error('Error fetching specie:', error)
      }
    }

    fetchSpecie()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.put(`http://localhost:3000/species/update/${species?.id}`, species, {
        withCredentials: true,
      })
      console.log('Specie updated:', response.data)
      setSpecie(response.data)
      window.location.href = '/listSpecies'
    } catch (error) {
      console.error('Error updating specie:', error)
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
                <div className="grid grid-cols-2 bg-white rounded-md p-2 gap-4">
                  <div className="w-fit">
                    <p className="mb-4">Id:</p>
                    <p className="mb-4">Name:</p>
                    <p className="mb-4">Point Value:</p>
                  </div>
                  {species && (
                    <div>
                      <p className="mb-4">{species.id}</p>
                      <input
                        className="mb-4"
                        type="text"
                        value={species.name ?? ''}
                        placeholder="Name"
                        onChange={(e) => setSpecie({ ...species, name: e.target.value })}
                      />{' '}
                      <br />
                      <input
                        className="mb-4"
                        type="number"
                        value={species.pointValue ?? ''}
                        placeholder="Point Value"
                        onChange={(e) => setSpecie({ ...species, pointValue: parseInt(e.target.value) })}
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

export default UpdateSpecie
