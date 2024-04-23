import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';

// Interface décrivant la structure des données utilisateur
interface CatchesData {
  id: string;
  user_id: string;
  length: string;
  weight: string;
  speciesId: string;
  localisation: string;
  pictures: string;
  description: string;
  pointValue: string;
  date: string;
}

function ListCatche() {
  const _= useUserStore();
  const [catches, setCatches] = useState<CatchesData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchCatches = async () => {
      try {
        const response = await axios.get<CatchesData[]>('http://localhost:3000/catches', { withCredentials: true }); // Préciser le type de réponse
        setCatches(response.data);
      } catch (error) {
        console.error('Error fetching catches:', error);
      }
    };

    fetchCatches();
  }, []);

  const handleCategorieDelete = async (catchesId: string) => {
    try {
      await axios.delete(`http://localhost:3000/catches/delete/${catchesId}`, { withCredentials: true });
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setCatches(catches.filter(catches => catches.id !== catchesId));
      window.location.href = "/listCatches";
    } catch (error) {
      console.error('Error deleting catch:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='mx-auto mt-10'>
            <div className='bg-slate-100 p-3'>
              {catches.map((catches, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto'>
                  <p className='text-sm'>Id: {catches.id}</p>
                  <a className='text-center' href={`./catches/update/${catches.id}`}>Modifier</a>
                  <button className='hover:bg-red-700' onClick={() => handleCategorieDelete(catches.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCatche;
