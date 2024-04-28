import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useUserStore } from '../../stores/UserStore'

// Interface décrivant la structure des données utilisateur
interface SpecieData {
  id: string
  name: string
  pointValue: number
}

function ListSpecies() {
  const _ = useUserStore()
  const [species, setSpecies] = useState<SpecieData[]>([]) // Spécifier le type des données ici

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<SpecieData[]>('http://localhost:3000/species', { withCredentials: true }) // Préciser le type de réponse
        setSpecies(response.data)
      } catch (error) {
        console.error('Error fetching species:', error)
      }
    }

    fetchMessages()
  }, [])

  const handleSpeciesDelete = async (speciesId: string) => {
    try {
      await axios.delete(`http://localhost:3000/species/delete/${speciesId}`, { withCredentials: true })
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setSpecies(species.filter((species) => species.id !== speciesId))
      window.location.href = '/listSpecies'
    } catch (error) {
      console.error('Error deleting species:', error)
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-cols-2 w-full">
          <NavBar />
          <div className="w-9/12 mx-auto mt-10">
            <div className="bg-slate-100 p-3">
              {species.map((specie, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto">
                  <p className="text-sm">Id: {specie.id}</p>
                  <p>Name: {specie.name}</p>
                  <a className="text-center" href={`./species/update/${specie.id}`}>
                    Modifier
                  </a>
                  <button className="hover:bg-red-700" onClick={() => handleSpeciesDelete(specie.id)}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListSpecies
