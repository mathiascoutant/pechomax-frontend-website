import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserStore } from '../pages/assets/store';

function Header() {
  const handleLogout = () => {
    axios.get('http://localhost:3000/users/auth/logout', {
      withCredentials: true
    })
  };
  const { username } = useUserStore();
  return (
    <>
      <div>
        <div className='grid grid-cols-2 h-20 w-full p-0 bg-slate-200 relative'>
          <Link to="/">
            <img className='w-20' src="./src/assets/images/logo.png" alt="" />
          </Link>
          <div className='grid grid-cols-2 w-50'>
            <a className='right-44 top-7 w-fit absolute' href="/user/update/">{username && <p>{username}</p>} </a>
            <button className='right-6 top-7 w-fit absolute' onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
