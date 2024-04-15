import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Barre from '../components/Barre';


function ListUsers() {

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='mx-auto mt-10'>
            <div className='bg-slate-100 p-3'>
              <div className='grid grid-cols-4 bg-[#c7f9cc] w-fit p-2 mb-4'>
                <p>Username: Arthurx</p>
                <p>Email: Arturx@gmail.com</p>
                <a className='text-center' href="">Voir</a>
                <a className='text-right hover:bg-red-700 w-fit' href="">Supprimer</a>
              </div>
              <div className='grid grid-cols-4 bg-[#c7f9cc] w-fit p-2'>
                <p>Username: Arthurx</p>
                <p>Email: Arturx@gmail.com</p>
                <a className='text-center' href="">Voir</a>
                <a className='text-center hover:bg-red-700 w-fit' href="">Supprimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListUsers;
