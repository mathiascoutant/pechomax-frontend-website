import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {
  const handleLogout = () => {
    axios.get('http://localhost:3000/users/auth/logout', {
      withCredentials: true
    })
  };
  return (
    <>
      <div>
        <div className='grid grid-cols-2 h-20 w-full p-0 bg-slate-200 relative'>
          <Link to="/">
            <img className='w-20' src="./src/assets/images/logo.png" alt="" />
          </Link>
          <button className='right-10 top-7 w-fit absolute' onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
    </>
  );
}

export default Header;
