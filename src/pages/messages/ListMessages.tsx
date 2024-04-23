import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Barre from '../../components/Barre';
import { useUserStore } from '../assets/store';

// Interface décrivant la structure des données utilisateur
interface MessageData {
  id: string;
  conversationId: string;
  user_id: string;
  content: string;
  pictures : string | null;
  createdAt: string;
  updatedAt: string;
}

function ListMessages() {
  const _= useUserStore();
  const [messages, setMessages] = useState<MessageData[]>([]); // Spécifier le type des données ici

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<MessageData[]>('http://localhost:3000/messages', { withCredentials: true }); // Préciser le type de réponse
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleMessageDelete = async (messagesId: string) => {
    try {
      await axios.delete(`http://localhost:3000/messages/delete/${messagesId}`, { withCredentials: true });
      // Supprimer la catégorie de la liste une fois qu'elle est supprimé avec succès
      setMessages(messages.filter(message => message.id !== messagesId));
      window.location.href = "/listMessages";
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='w-9/12 mx-auto mt-10'>
            <div className='bg-slate-100 p-3'>
              {messages.map((message, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 bg-[#A7C4E4] p-2 mb-4 w-12/12 mx-auto'>
                  <p className='text-sm'>Id: {message.id}</p>
                  <p>Conversation Id: {message.conversationId}</p>
                  <a className='text-center' href={`./messages/update/${message.id}`}>Modifier</a>
                  <button className='hover:bg-red-700' onClick={() => handleMessageDelete(message.id)}>Supprimer</button>
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
