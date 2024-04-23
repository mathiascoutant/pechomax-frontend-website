import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';
import { useParams } from 'react-router-dom';

interface CategorieData {
  id: string;
  name: string;
}

function UpdateCategorie() {
  const userData = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [categorie, setCategorie] = useState<CategorieData | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get<CategorieData>(`http://localhost:3000/categories/${id}`,{ withCredentials: true });
        setCategorie(response.data);
      } catch (error) {
        console.error('Error fetching categorie:', error);
      }
    };

    fetchName();
  }, [id]); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(`http://localhost:3000/categories/update/${categorie?.id}`, categorie,{ withCredentials: true });
      console.log('Categorie updated:', response.data);
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setCategorie(response.data);
      window.location.href = "/listCategories";
    } catch (error) {
      console.error('Error updating categorie:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='w-9/12 mx-auto mt-10'>
            <form onSubmit={handleSubmit}>
              <div className='bg-slate-100 p-3 grid grid-cols-2 gap-20'>
                <div className='grid grid-cols-2 bg-white rounded-md  p-2 gap-4'>
                  <div className='w-fit'>
                    <p className='mb-4'>Id:</p>
                    <p className='mb-4'>Name:</p>
                  </div>
                  {categorie && (
                    <div>
                      <p>{categorie.id ?? ''}</p>
                      <input className='mb-4' type="text" value={categorie.name ?? ''} placeholder="Name" onChange={e => setCategorie({ ...categorie, name: e.target.value })} />
                    </div>
                  )}
                  <button type='submit'>Modifier</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCategorie;
