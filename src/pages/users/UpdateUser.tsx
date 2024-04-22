import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';
import { useParams } from 'react-router-dom';

// Interface décrivant la structure des données utilisateur
interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  phoneNumber: string | null;
  profilePic: string | null;
  city: string | null;
  region: string | null;
  zipCode: string | null;
  score: number;
  createdAt: string;
  updatedAt: string;
}

function User() {
  const userData = useUserStore();
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserData>(`http://localhost:3000/users/${username}`,{ withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [username]); // Ajouter username comme dépendance pour que useEffect soit déclenché à chaque changement du paramètre username

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(`http://localhost:3000/users/update/${user?.id}`, user,{ withCredentials: true });
      console.log('User updated:', response.data);
      // Mettre à jour l'état local de l'utilisateur avec les nouvelles données si la mise à jour est réussie
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
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
                    <p className='mb-4'>Username:</p>
                    <p className='mb-4'>Email:</p>
                    <p className='mb-4'>Téléphone:</p>
                    <p className='mb-4'>Ville:</p>
                    <p className='mb-4'>Région:</p>
                  </div>
                  {user && (
                    <div>
                      <input className='mb-4' type="text" value={user.username ?? ''} placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
                      <input className='mb-4' type="email" value={user.email ?? ''} placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} />
                      <input className='mb-4' type="phone" value={user.phoneNumber ?? ''} placeholder="Téléphone" onChange={e => setUser({ ...user, phoneNumber: e.target.value })} />
                      <input className='mb-4' type="text" value={user.city ?? ''} placeholder="Ville" onChange={e => setUser({ ...user, city: e.target.value })} />
                      <input className='mb-4' type="text" value={user.region ?? ''} placeholder="Département" onChange={e => setUser({ ...user, region: e.target.value })} />
                    </div>
                  )}
                </div>
                <div className='grid grid-cols-2 bg-white rounded-md w-fit p-2 gap-4'>
                  <div>
                    <p className='mb-4'>Id:</p>
                    <p className='mb-4'>Role:</p>
                    <p className='mb-4'>Création:</p>
                    <p className='mb-4'>Score:</p>
                    <p className='mb-4'>Niveau:</p>
                  </div>
                  {user && (
                    <div>
                      <input className='mb-4' type="text" value={user.id ?? ''} placeholder="Id" disabled />
                      <input className='mb-4' type="text" value={user.role ?? ''} placeholder="Admin" disabled />
                      <p className='mb-4'>{user.createdAt}</p>
                      <input className='mb-4' type="text" value={user.score.toString()} placeholder="Score" onChange={e => setUser({ ...user, score: parseInt(e.target.value) })} />
                      <input className='mb-4' type="text" value={"1"} placeholder="Niveau" disabled />
                      <button type='submit'>Modifier</button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
