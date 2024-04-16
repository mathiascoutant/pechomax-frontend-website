import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Barre from '../components/Barre';
import { useUserStore } from '../pages/assets/store';

function ListUsers() {
  const userData = useUserStore(); // Assurez-vous que useUserStore() renvoie le bon type
  const username = userData ? userData.username : null; // Vérification de nullité
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/getAll');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='mx-auto mt-10'>
            <div className='bg-slate-100 p-3'>
              {users.map((user, index) => (
                <div key={index} className='grid grid-cols-4 bg-[#c7f9cc] w-fit p-2 mb-4'>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <a className='text-center' href="">Voir</a>
                  <a className='text-right hover:bg-red-700 w-fit' href="">Supprimer</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {username && (
        <p>Username from store: {username}</p>
      )}
    </>
  );
}

export default ListUsers;
