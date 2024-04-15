import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div>
        <div className='grid grid-cols-2 h-fit w-full p-0 bg-slate-200	'>
          <img className='w-20' src="./src/assets/images/logo.png" alt="" />
          <Link className='text-right	mr-10 pt-6' to="/login">Déconnexion</Link>
        </div>
        <div className='bg-[#323640] w-fit h-96 pt-3'>
          <div className='m-auto grid grid-cols-1 mt-5 pr-2 pl-2'>
            <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
              <Link to="/ListUsers">Utilisateurs</Link>
            </div>
            <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
              <Link to="/ListCatches">Prises</Link>
            </div>
            <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
              <Link to="/ListConversations">Conversations</Link>
            </div>
            <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left'>
              <Link to="/ListConversations">Conversations</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
