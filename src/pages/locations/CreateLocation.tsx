import Header from '../../components/Header';
import Barre from '../../components/Barre';
import axios from "axios";



const CreateLocation: React.FC = () => {
        const handleInit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const returnData: { longitude: string | null, latitude: string | null, name: string | null, description: string | null } = {
                longitude: data.get('longitude') as string | null,
                latitude: data.get('latitude') as string | null,
                name: data.get('name') as string | null,
                description: data.get('description') as string | null
            }
            axios.post('http://localhost:3000/locations/create', returnData, { withCredentials: true })
                .then(response => {
                    window.location.href = "/listLocations";
                    return response.data;
                })
                .catch(error => {
                   return error;
                })
            }


    return (
        <>
        <div>
            <Header />
            <div className='flex flex-cols-2 w-full'>
            <Barre />
            <div className='mx-auto mt-10'>
                <form  onSubmit={handleInit}>
                    <input type="text" name="longitude" placeholder="Longitude" />
                    <input type="text" name="latitude" placeholder="Latitude" />
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="description" placeholder="Description" />
                    <input type="submit" value="S'enregistrer" />
                </form>
            </div>
            </div>
        </div>
        </>
    );
}

export default CreateLocation;
