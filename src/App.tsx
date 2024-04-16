import { useNavigate } from 'react-router-dom';
import Header from '../src/components/Header';
import Barre from '../src/components/Barre';

const App = () => {
  const token = localStorage.getItem('access_token');
  if (token == null) {
    const navigate = useNavigate();
    navigate('/login');
  } else {
    console.log("okk");
  }
  return (
      <div>
        <Header />
        <Barre />
      </div>
  );
}

export default App;
