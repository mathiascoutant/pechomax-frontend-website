import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <>
      <div>
        <div className='grid grid-cols-2 h-20 w-full p-0 bg-slate-200 relative'>
          <Link to="/">
            <img className='w-20' src="./src/assets/images/logo.png" alt="" />
          </Link>
          <Link className='text-right	mr-10 pt-6' to="/login">Déconnexion</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
