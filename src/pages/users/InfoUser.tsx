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

function ListUsers() {
  const userData = useUserStore();
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserData>(`http://localhost:3000/users/${username}`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [username]); // Ajouter username comme dépendance pour que useEffect soit déclenché à chaque changement du paramètre username

  return (
    <>
    <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
            <Barre />
            <div className='mx-auto mt-10'>
                <div className='bg-slate-100 p-3 grid grid-cols-2 gap-20'>
                    {user && ( // Vérifiez si user est défini avant de le mapper
                    <div>
                        <p>Id: {user.id}</p>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Téléphone: {user.phoneNumber}</p>
                        <p>Role: {user.role}</p>
                        <p>Score: {user.score}</p>
                        <p>Date de création: {user.createdAt}</p>
                        <p>Date de mise à jour: {user.updatedAt}</p>
                        <p>Ville: {user.city}</p>
                        <p>Région: {user.region}</p>
                        <p>Code postal: {user.zipCode}</p>
                        <p>Photo de profil: {user.profilePic}</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default ListUsers;
