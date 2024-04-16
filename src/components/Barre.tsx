import { Link } from 'react-router-dom';

function Barre() {
  return (
    <>
      <div className='bg-[#323640] w-40 h-screen pt-3'>
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
    </>
  );
}

export default Barre;
