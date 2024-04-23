import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/users/Login';
import ListUsers from './pages/users/ListUsers';
import User from './pages/users/UpdateUser';
import InfoUser from './pages/users/InfoUser';
import Init from './pages/users/Init';
import App from './App';
import CreateCategorie from './pages/categories/CreateCategorie';
import ListCategories from './pages/categories/ListCategories';
import UpdateCategorie from './pages/categories/UpdateCategorie';
import CreateConversation from './pages/conversations/CreateConversation';
import ListConversations from './pages/conversations/ListConversations';
import InfoConversations from './pages/conversations/InfoConversation';
import UpdateConversation from './pages/conversations/UpdateConversations';
import CreateMessage from './pages/messages/CreateMessage';


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
          <Route path="/listCategories" element={<ListCategories />} />
          <Route path="/categories/create" element={<CreateCategorie />} />
          <Route path="/categories/update/:id" element={<UpdateCategorie />} />
          <Route path="/conversations/create" element={<CreateConversation />} />
          <Route path="/listConversations" element={<ListConversations />} />
          <Route path="/conversations/:id" element={<InfoConversations />} />
          <Route path="/conversations/update/:id" element={<UpdateConversation />} />
          <Route path="/messages/create" element={<CreateMessage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
