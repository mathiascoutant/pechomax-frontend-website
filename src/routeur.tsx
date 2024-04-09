import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login';
import App from './App';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
