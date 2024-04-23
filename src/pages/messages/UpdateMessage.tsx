import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';
import { useParams } from 'react-router-dom';

interface MessageData {
    id: string;
    conversationId: string;
    userId: string;
    content: string;
    pictures : string | null;
    createdAt: string;
    updatedAt: string;
  }

function UpdateMessage() {
  const _ = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessage] = useState<MessageData | null>(null);

  useEffect(() => {
    const fetchid = async () => {
      try {
        const response = await axios.get<MessageData>(`http://localhost:3000/messages/${id}`,{ withCredentials: true });
        setMessage(response.data);
      } catch (error) {
        console.error('Error fetching categorie:', error);
      }
    };

    fetchid();
  }, [id]); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de l'utilisateur
      const response = await axios.put(`http://localhost:3000/messages/update/${messages?.id}`, messages,{ withCredentials: true });
      console.log('Message updated:', response.data);
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setMessage(response.data);
      window.location.href = "/listMessages";
    } catch (error) {
      console.error('Error updating message:', error);
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
              <div className='bg-slate-100 p-3 grid grid-cols-1 gap-20'>
                <div className='grid grid-cols-2 bg-white rounded-md  p-2 gap-4'>
                  <div className='w-fit'>
                    <p className='mb-4'>Id:</p>
                    <p className='mb-4'>UserId:</p>
                    <p className='mb-4'>Content:</p>
                    <p className='mb-4'>ConversationId:</p>
                    <p className='mb-4'>CreatedAt:</p>
                    <p className='mb-4'>UpdatedAt:</p>
                  </div>
                  {messages && (
                    <div>
                      <p className='mb-4'>{messages.id ?? ''}</p>
                      <p className='mb-4'>{messages.userId ?? ''}</p>
                      <input className='mb-4' type="text" value={messages.content ?? ''} placeholder="content" onChange={e => setMessage({ ...messages, content: e.target.value })} />
                      <p className='mb-4'>{messages.conversationId ?? ''}</p>
                      <p className='mb-4'>{messages.createdAt ?? ''}</p>
                      <p className='mb-4'>{messages.updatedAt ?? ''}</p>
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

export default UpdateMessage;
