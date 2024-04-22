import Header from '../components/Header';
import Barre from '../components/Barre';

function User() {
  return (
    <>
      <div>
        <Header />
        <div className='flex flex-cols-2 w-full'>
          <Barre />
          <div className='w-7/12 mx-auto mt-10'>
            <div className='bg-slate-100 p-3 grid grid-cols-2 gap-20'>
                <div className='grid grid-cols-2 bg-white rounded-md  p-2 gap-4'>
                    <div className='w-fit'>
                        <p className='mb-4'>Username:</p>
                        <p className='mb-4'>Email:</p>
                        <p className='mb-4'>Télphone:</p>
                        <p className='mb-4'>Ville:</p>
                        <p className='mb-4'>Région:</p>
                    </div>
                    <div>
                        <input className='mb-4' type="text" value={"toto"} placeholder="Username"/>
                        <input className='mb-4' type="email" value={"toto@gmail.com"} placeholder="Email"/>
                        <input className='mb-4' type="phone" value={"0676767676"} placeholder="Téléphone"/>
                        <input className='mb-4' type="text" value={"Bordeaux"} placeholder="Ville"/>
                        <input className='mb-4' type="text" value={"Aquitaine"} placeholder="Département"/>
                    </div>
                </div>
                <div className='grid grid-cols-2 bg-white rounded-md w-fit p-2 gap-4'>
                    <div>
                        <p className='mb-4'>Id:</p>
                        <p className='mb-4'>Role:</p>
                        <p className='mb-4'>Création:</p>
                        <p className='mb-4'>Score:</p>
                        <p className='mb-4'>Niveau:</p>
                    </div>
                    <div>
                        <input className='mb-4' type="text" value={"1"} placeholder="Id"/>
                        <input className='mb-4' type="text" value={"Admin"} placeholder="Admin"/>
                        <input className='mb-4' type="text" value={"97"} placeholder="Score"/>
                        <input className='mb-4' type="text" value={"1"} placeholder="Niveau"/>
                        <p className='mb-4'>22/03/2024</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
