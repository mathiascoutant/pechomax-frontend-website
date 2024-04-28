import React from 'react';
import Header from '../src/components/Header';
import { useUserStore } from '../src/pages/assets/store';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const { username } = useUserStore();

  return (
    <div>
      <Header />
      <NavBar />
      {username && <p>Username: {username}</p>}
    </div>
  );
}

export default App;
