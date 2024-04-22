import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/users/Login';
import ListUsers from './pages/users/ListUsers';
import User from './pages/users/UpdateUser';
import InfoUser from './pages/users/InfoUser';
import Init from './pages/users/Init';
import App from './App';
import CreateCategorie from './pages/categories/CreateCategorie';
import ListCategories from './pages/categories/ListCategories';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/init" element={<Init />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={""} />
          <Route path="/listUsers" element={<ListUsers />} />
          <Route path="/users/update/:username" element={<User />} />
          <Route path="/users/:username" element={<InfoUser />} />
          <Route path="/listcategories" element={<ListCategories />} />
          <Route path="/categories/create" element={<CreateCategorie />} />
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
