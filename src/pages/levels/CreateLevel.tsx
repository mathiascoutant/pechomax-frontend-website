import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import axios from "axios";
import { useUserStore } from '../assets/store';

  

const CreateLevel: React.FC = () => {
    const _= useUserStore();
    const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const returnData: { title: string | null, value: number | null, start: number | null, end: number | null } = {
            title: data.get('title') as string | null,
            value: Number(data.get('value')) as number | null,
            start: Number(data.get('start')) as number | null,
            end: Number(data.get('end')) as number | null
        }
        axios.post('http://localhost:3000/levels/create', returnData, { withCredentials: true })
            .then(response => {
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
                    <input type="text" name="title" placeholder="Title" />
                    <input type="text" name="value" placeholder="Value" />
                    <input type="text" name="start" placeholder="Start" />
                    <input type="text" name="end" placeholder="End" />
                    <input type="submit" value="S'enregistrer" />
                </form>
            </div>
            </div>
        </div>
        </>
    );
}

export default CreateLevel;
