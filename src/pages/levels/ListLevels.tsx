import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { useUserStore } from '../assets/store';

// Interface décrivant la structure des données utilisateur
interface LevelData {
  id: string;
  title: string;
  value: string;
  start: string;
  end : string | null;
}

function ListLevels() {
  const _= useUserStore();
  const [levels, setLevels] = useState<LevelData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get<LevelData[]>('http://localhost:3000/levels', { withCredentials: true }); // Préciser le type de réponse
        setLevels(response.data);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);

  const handleLevelDelete = async (levelId: string) => {
    try {
      await axios.delete(`http://localhost:3000/levels/delete/${levelId}`, { withCredentials: true });
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setLevels(levels.filter(level => level.id !== levelId));
      window.location.href = "/listLevels";
    } catch (error) {
      console.error('Error deleting level:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <NavBar />
          <div className='w-9/12 mx-auto mt-10'>
            <div className='bg-slate-100 p-3'>
              {levels.map((level, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto'>
                  <p className='text-sm'>Id: {level.id}</p>
                  <p>Title: {level.title}</p>
                  <a className='text-center' href={`./levels/update/${level.id}`}>Modifier</a>
                  <button className='hover:bg-red-700' onClick={() => handleLevelDelete(level.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListLevels;
