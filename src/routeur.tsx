import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ListUsers from './pages/ListUsers';
import User from './pages/UpdateUser';
import Init from './pages/Init';
import App from './App';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Init" element={<Init />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={""} />
          <Route path="/ListUsers" element={<ListUsers />} />
          <Route path="/user/update/:id" element={<User />} />
          <Route path="/categories" element={""} />
          <Route path="/categories/create" element={""} />
          <Route path="/categories/:id" element={""} />
          <Route path="/categories/update/:id" element={""} />
          <Route path="/categories/delete/:id" element={""} />
          <Route path="/conversations/" element={""} />
          <Route path="/conversations/create" element={""} />
          <Route path="/conversations/update/:id" element={""} />
          <Route path="/conversations/delete/:id" element={""} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
