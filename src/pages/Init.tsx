import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Barre from '../components/Barre';
import axios from "axios";

import { useNavigate } from "react-router-dom";



const Init: React.FC = () => {
    const navigate = useNavigate();
      
        const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const returnData: { username: string | null, email: string | null, password: string | null, role: string | null } = {
                username: data.get('username') as string | null,
                email: data.get('email') as string | null,
                password: data.get('password') as string | null,
                role: "Admin" as string | null
            }
            axios.post('http://localhost:3000/users/auth/register', returnData)
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
            <Barre />
            <div className='mx-auto mt-10'>
                <form  onSubmit={handleInit}>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="text" name="email" placeholder="Email" />
                    <input type="text" name="password" placeholder="Password" />
                    <input type="submit" value="S'enregistrer" />
                </form>
            </div>
            </div>
        </div>
        </>
    );
}

export default Init;
