import React from 'react';
import Header from '../src/components/Header';
import Barre from '../src/components/Barre';
import { useUserStore } from '../src/pages/assets/store';

const App: React.FC = () => {
  const { username } = useUserStore();

  return (
    <div>
      <Header />
      <Barre />
      {username && <p>Username: {username}</p>}
    </div>
  );
}

export default App;
