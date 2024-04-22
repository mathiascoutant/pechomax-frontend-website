import React, { useEffect } from 'react';
import { useUserStore } from '../assets/store';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {username, setUsername } = useUserStore(); // Utilisez directement la fonction setUsername

  useEffect(() => {
    // Vérifier et rediriger automatiquement vers la page d'accueil si un nom d'utilisateur est déjà enregistré
    if (username) {
      navigate('/');
    }
  }, [username, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const returnData: { username: string | null, password: string | null } = {
      username: data.get('username') as string | null,
      password: data.get('password') as string | null
    };
    try {
      await axios.post('http://localhost:3000/auth/login', returnData, { withCredentials: true });
      setUsername(returnData.username);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="bg-[url('./src/assets/images/background-login.jpeg')] flex flex-col h-screen w-screen bg-no-repeat m-0 p-0">
      <div className='w-screen'>
        <Link to="/">
          <img className='w-20' src="./src/assets/images/logo.png" alt="" />
        </Link>
      </div>
      <div className='flex items-center justify-center bg-white max-w-96 w-auto m-auto'>
        <div className='m-auto w-fit p-10'>
          <h2 className='text-black-600 mb-5'>Connectez-vous à votre compte</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input className="border-2 border-black-600 mb-3 w-full pl-2" type="text" name="username" placeholder='Username' />
            </div>
            <div>
              <input className="border-2 border-black-600 mb-4 w-full pl-2" type="password" name="password" placeholder='Mot de passe' />
            </div>
            <div className="flex justify-center">
              <button className="bg-[#A7C4E4] pt-1 pb-1 pl-2 pr-2 rounded-md" type="submit">Se connecter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
