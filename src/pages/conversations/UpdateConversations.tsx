import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';
import { useParams } from 'react-router-dom';

interface ConversationsData {
    id: string;
    user_id: string;
    title: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    user:
        {
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
  }

function UpdateConversation() {
  const _ = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<ConversationsData | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get<ConversationsData>(`http://localhost:3000/conversations/${id}`,{ withCredentials: true });
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchId();
  }, [id]); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mettre à jour l'URL pour l'endpoint de mise à jour avec l'ID de la conversation
      const response = await axios.put(`http://localhost:3000/conversations/update/${conversation?.id}`, conversation,{ withCredentials: true });
      console.log('Conversation updated:', response.data);
      // Mettre à jour l'état local de la catégorie avec les nouvelles données si la mise à jour est réussie
      setConversation(response.data);
      window.location.href = "/listConversations";
    } catch (error) {
      console.error('Error updating conversation:', error);
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
                    <p className='mb-4'>User Id:</p>
                    <p className='mb-4'>Title:</p>
                    <p className='mb-4'>Category Id:</p>
                    <p className='mb-4'>Created At:</p>
                    <p className='mb-4'>Updated At:</p>
                  </div>
                  {conversation && (
                    <div>
                      <p className='mb-4'>{conversation.id ?? ''}</p>
                      <p className='mb-4'>{conversation.user.username ?? ''}</p>
                      <input className='mb-4 w-6/12' type="text" value={conversation.title ?? ''} placeholder="title" onChange={e => setConversation({ ...conversation, title: e.target.value })} /> <br />
                      <input className='mb-4 w-6/12' type="text" value={conversation.categoryId ?? ''} placeholder="category" onChange={e => setConversation({ ...conversation, categoryId: e.target.value })} />
                      <p className='mb-4'>{conversation.createdAt ?? ''}</p>
                      <p>{conversation.updatedAt ?? ''}</p>
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

export default UpdateConversation;
