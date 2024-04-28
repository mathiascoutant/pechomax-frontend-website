import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { useUserStore } from '../assets/store';
import { useParams } from 'react-router-dom';

interface LevelData {
    id: string;
    title: string;
    value: string;
    start: string;
    end : string | null;
  }

function UpdateLevel() {
  const _ = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [levels, setLevel] = useState<LevelData | null>(null);

  useEffect(() => {
    const fetchid = async () => {
      try {
        const response = await axios.get<LevelData>(`http://localhost:3000/levels/${id}`,{ withCredentials: true });
        setLevel(response.data);
      } catch (error) {
        console.error('Error fetching level:', error);
      }
    };

    fetchid();
  }, [id]); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(`http://localhost:3000/levels/update/${levels?.id}`, levels,{ withCredentials: true });
      console.log('Level updated:', response.data);
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setLevel(response.data);
      window.location.href = "/listLevels";
    } catch (error) {
      console.error('Error updating level:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <NavBar />
          <div className='w-9/12 mx-auto mt-10'>
            <form onSubmit={handleSubmit}>
              <div className='bg-slate-100 p-3 grid grid-cols-1 gap-20'>
                <div className='grid grid-cols-2 bg-white rounded-md  p-2 gap-4'>
                  <div className='w-fit'>
                    <p className='mb-4'>Id:</p>
                    <p className='mb-4'>Title:</p>
                    <p className='mb-4'>Value:</p>
                    <p className='mb-4'>Start:</p>
                    <p className='mb-4'>End:</p>
                  </div>
                  {levels && (
                    <div>
                      <p className='mb-4'>{levels.id ?? ''}</p>

                      <input className='mb-4' type="text" value={levels.title ?? ''} placeholder="title" onChange={e => setLevel({ ...levels, title: e.target.value })} /> <br />
                      <input className='mb-4' type="text" value={levels.value ?? ''} placeholder="value" onChange={e => setLevel({ ...levels, value: e.target.value })} /> <br />
                      <input className='mb-4' type="text" value={levels.start ?? ''} placeholder="Start" onChange={e => setLevel({ ...levels, value: e.target.value })} /> <br />
                      <input className='mb-4' type="text" value={levels.end ?? ''} placeholder="End" onChange={e => setLevel({ ...levels, end: e.target.value })} />
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

export default UpdateLevel;
