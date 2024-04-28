import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import axios from "axios";
import { useUserStore } from '../assets/store';
import { useEffect, useState } from 'react';

interface SpecieData {
    id: string;
    name: string;
    pointValue: number;
  }

const CreateCatch: React.FC = () => {
    const _= useUserStore();
    const [species, setCatche] = useState<SpecieData[]>([]); // Spécifier le type des données ici

    useEffect(() => {
        const fetchcatche = async () => {
        try {
            const response = await axios.get<SpecieData[]>('http://localhost:3000/species', { withCredentials: true }); // Préciser le type de réponse
            setCatche(response.data);
        } catch (error) {
            console.error('Error fetching species:', error);
        }
        };

        fetchcatche();
    }, []);
        const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const returnData: { weight: string | null, length: string | null, speciesId: string | null, localisation: string | null, description: string | null, date: string } = {
                weight: data.get('weight') as string | null,
                length: data.get('length') as string | null,
                speciesId: data.get('speciesId') as string | null,
                localisation: data.get('localisation') as string | null,
                description: data.get('description') as string | null,
                date: (new Date(data.get('date') as string)).toISOString()
            }
            axios.post('http://localhost:3000/catches/create', returnData, { withCredentials: true })
                .then(response => {
                    window.location.href = "/listCatches";
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
                    <input type="text" name="length" placeholder="length" />
                    <input type="text" name="weight" placeholder="Weight" />
                    <input type="text" name="localisation" placeholder="Location" />
                    <input type="text" name="description" placeholder="Description" />
                    <select name="speciesId" id="pet-select">
                        {species.map((specie, index) => (
                            <option key={index} value={specie.id}>{specie.name}</option>
                        ))}
                        </select>
                    <input type="date" name="date" id="" placeholder='Date' />
                    <input type="submit" value="S'enregistrer" />
                </form>
            </div>
            </div>
        </div>
        </>
    );
}

export default CreateCatch;
