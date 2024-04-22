import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';

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
  const username = userData ? userData.username : null;
  const [users, setUsers] = useState<UserData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserData[]>('http://localhost:3000/users', { withCredentials: true }); // Préciser le type de réponse
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDelete = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/delete/${userId}`, { withCredentials: true });
      // Supprimer l'utilisateur de la liste une fois qu'il est supprimé avec succès
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
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
              {users.map((user, index) => (
                <div key={index} className='grid grid-cols-5 gap-4 bg-[#c7f9cc] p-2 mb-4 w-12/12 mx-auto'>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <a className='text-center' href={`./users/${user.username}`}>Voir</a>
                  <a className='text-center' href={`./users/update/${user.username}`}>Modifier</a>
                  <button className='text-right hover:bg-red-700 w-fit' onClick={() => handleUserDelete(user.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListUsers;
