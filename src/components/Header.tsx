import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserStore } from '../pages/assets/store';

function Header() {
  const { username } = useUserStore();

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await axios.get('http://localhost:3000/auth/logout', {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 h-20 w-full p-0 bg-slate-200 relative'>
        <Link to="/">
          <img className='w-20' src="./src/assets/images/logo.png" alt="" />
        </Link>
        <div className='grid grid-cols-2 w-50'>
          <Link className='right-44 top-7 w-fit absolute' to={username ? `/user/update/${username}` : '/'}>
            {username && <p>{username}</p>}
          </Link>
          <form onSubmit={handleLogout}>
            <button className='right-6 top-7 w-fit absolute'>Déconnexion</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
