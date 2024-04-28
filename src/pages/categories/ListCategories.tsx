import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { useUserStore } from '../../stores/UserStore'

// Interface décrivant la structure des données utilisateur
interface CategorieData {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

function ListCategories() {
  const _ = useUserStore()
  const [categories, setCategories] = useState<CategorieData[]>([]) // Spécifier le type des données ici

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<CategorieData[]>('http://localhost:3000/categories', { withCredentials: true }) // Préciser le type de réponse
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategorieDelete = async (categorieId: string) => {
    try {
      await axios.delete(`http://localhost:3000/categories/delete/${categorieId}`, { withCredentials: true })
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setCategories(categories.filter((categorie) => categorie.id !== categorieId))
      window.location.href = '/listCategories'
    } catch (error) {
      console.error('Error deleting categorie:', error)
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-cols-2 w-full">
          <NavBar />
          <div className="mx-auto mt-10">
            <div className="bg-slate-100 p-3">
              {categories.map((categorie, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto">
                  <p className="text-sm">Id: {categorie.id}</p>
                  <p>Name: {categorie.name}</p>
                  <a className="text-center" href={`./categories/update/${categorie.id}`}>
                    Modifier
                  </a>
                  <button className="hover:bg-red-700" onClick={() => handleCategorieDelete(categorie.id)}>
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

export default ListCategories
