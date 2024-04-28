import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <div className='bg-[#323640] w-40 h-screen pt-3'>
        <div className='m-auto grid grid-cols-1 mt-5 pr-2 pl-2'>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listUsers">Utilisateurs</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listCatches">Prises</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listConversations">Conversations</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listcategories">Catégories</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listmessages">Messages</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listlocations">Locations</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left mb-4'>
            <Link to="/listspecies">Species</Link>
          </div>
          <div className='hover:bg-[#3D424E] text-white w-full p-2 m-auto text-left'>
            <Link to="/listlevels">Levels</Link>
          </div>
        </div>
      </div>
    </>
  );
};
