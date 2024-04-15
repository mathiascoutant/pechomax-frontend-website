import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ListUsers from './pages/ListUsers';
import Init from './pages/Init';
import App from './App';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ListUsers" element={<ListUsers />} />
        <Route path="/Init" element={<Init />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
