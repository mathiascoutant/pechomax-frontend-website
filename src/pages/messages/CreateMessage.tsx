import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import axios from "axios";
import { useUserStore } from '../assets/store';
import { useEffect, useState } from 'react';

interface ConversationseData {
    id: string;
    user_id: string;
    title: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  }
  

const CreateMessage: React.FC = () => {

    const _= useUserStore();
    const [conversation, setConversation] = useState<ConversationseData[]>([]); // Spécifier le type des données ici

    useEffect(() => {
        const fetchconversations = async () => {
        try {
            const response = await axios.get<ConversationseData[]>('http://localhost:3000/conversations', { withCredentials: true }); // Préciser le type de réponse
            setConversation(response.data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
        };

        fetchconversations();
    }, []);
    const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const returnData: { content: string | null, conversationId: string | null } = {
            content: data.get('content') as string | null,
            conversationId: data.get('conversationId') as string | null
        }
        axios.post('http://localhost:3000/messages/create', returnData, { withCredentials: true })
            .then(response => {
                window.location.href = "/listMessages";
                return response.data;
            })
            .catch(error => {
               return error;
            })
        }


    return (
        <>
        <div>
            <Header />
            <div className='flex flex-cols-2 w-full'>
            <NavBar />
            <div className='mx-auto mt-10'>
                <form  onSubmit={handleInit}>
                    <input type="text" name="content" placeholder="content" />
                        <select name="conversationId" id="pet-select">
                        {conversation.map((conversation, index) => (
                            <option key={index} value={conversation.id}>{conversation.title}</option>
                        ))}
                        </select>
                    <input type="submit" value="S'enregistrer" />
                </form>
            </div>
            </div>
        </div>
        </>
    );
}

export default CreateMessage;
