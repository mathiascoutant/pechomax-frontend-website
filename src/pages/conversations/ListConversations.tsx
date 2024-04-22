import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';

// Interface décrivant la structure des données conversation
interface ConversationseData {
  id: string;
  user_id: string;
  title: string;
  category_id: string;
  created_at: string;
  updated_at: string;
}

function listConversations() {
  const _= useUserStore();
  const [conversations, setConversations] = useState<ConversationseData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get<ConversationseData[]>('http://localhost:3000/conversations', { withCredentials: true }); // Préciser le type de réponse
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationDelete = async (conversationsId: string) => {
    try {
      await axios.delete(`http://localhost:3000/conversations/delete/${conversationsId}`, { withCredentials: true });
      // Supprimer la conversation de la liste une fois qu'elle est supprimé avec succès
      setConversations(conversations.filter(conversation => conversation.id !== conversationsId));
      window.location.href = "/listConversations";
    } catch (error) {
      console.error('Error deleting conversation:', error);
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
              {conversations.map((conversation, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto'>
                  <p className='text-sm'>Id: {conversation.id}</p>
                  <p>Title: {conversation.title}</p>
                  <a className='text-center' href={`./conversations/update/${conversation.id}`}>Modifier</a>
                  <button className='hover:bg-red-700' onClick={() => handleConversationDelete(conversation.id)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default listConversations;
