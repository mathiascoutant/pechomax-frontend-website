import Header from '../../components/Header';
import Barre from '../../components/Barre';
import axios from "axios";
import { useUserStore } from '../assets/store';
import { useEffect, useState } from 'react';

interface CategorieData {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
  

const CreateConversation: React.FC = () => {

    const _= useUserStore();
    const [categories, setCategories] = useState<CategorieData[]>([]); // Spécifier le type des données ici

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await axios.get<CategorieData[]>('http://localhost:3000/categories', { withCredentials: true }); // Préciser le type de réponse
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };

        fetchCategories();
    }, []);
    const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const returnData: { title: string | null, categoryId: string | null } = {
            title: data.get('title') as string | null,
            categoryId: data.get('categoryId') as string | null
        }
        axios.post('http://localhost:3000/conversations/create', returnData, { withCredentials: true })
            .then(response => {
                window.location.href = "/listConversations";
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
            <Barre />
            <div className='mx-auto mt-10'>
                <form  onSubmit={handleInit}>
                    <input type="text" name="title" placeholder="Title" />
                        <select name="categoryId" id="pet-select">
                        {categories.map((categorie, index) => (
                            <option key={index} value={categorie.id}>{categorie.name}</option>
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

export default CreateConversation;
