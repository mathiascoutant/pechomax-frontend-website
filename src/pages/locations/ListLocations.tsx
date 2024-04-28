import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { useUserStore } from '../assets/store';

// Interface décrivant la structure des données utilisateur
interface LocationData {
  id: string;
  longitude: string;
  latitude: string;
  name: string;
  description : string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

function ListMessages() {
  const _= useUserStore();
  const [locations, setLocations] = useState<LocationData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<LocationData[]>('http://localhost:3000/locations', { withCredentials: true }); // Préciser le type de réponse
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationDelete = async (locationId: string) => {
    try {
      await axios.delete(`http://localhost:3000/locations/delete/${locationId}`, { withCredentials: true });
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setLocations(locations.filter(location => location.id !== locationId));
      window.location.href = "/listLocations";
    } catch (error) {
      console.error('Error deleting location:', error);
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
              {locations.map((location, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto'>
                  <p className='text-sm'>Id: {location.id}</p>
                  <p>Name: {location.name}</p>
                  <a className='text-center' href={`./locations/update/${location.id}`}>Modifier</a>
                  <button className='hover:bg-red-700' onClick={() => handleLocationDelete(location.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListMessages;
