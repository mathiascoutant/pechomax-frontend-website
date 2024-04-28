import React from 'react';
import Header from '../src/components/Header';
import { useUserStore } from '../src/pages/assets/store';
import NavBar from './components/NavBar';
import useJwtLogin from './hooks/useJwtLogin';
import { Link, Outlet } from 'react-router-dom';

const App: React.FC = () => {
  const { username } = useUserStore();
  const { isLoading, isError, error } = useJwtLogin()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>
      <p>There has been an error</p>
      <p>{error?.response?.data?.message}</p>
      <Link to="/login" className="text-blue-300">got to login</Link>
    </div>
  }

  return (
    <div>
      <Header />
      <NavBar />
      {username && <p>Username: {username}</p>}
      <Outlet />
    </div>
  );
}

export default App;
