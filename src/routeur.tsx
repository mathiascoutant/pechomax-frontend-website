import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/users/Login'
import ListUsers from './pages/users/ListUsers'
import UpdateUser from './pages/users/UpdateUser'
import InfoUser from './pages/users/InfoUser'
import Init from './pages/users/Init'
import CreateCategorie from './pages/categories/CreateCategorie'
import ListCategories from './pages/categories/ListCategories'
import UpdateCategorie from './pages/categories/UpdateCategorie'
import CreateConversation from './pages/conversations/CreateConversation'
import ListConversations from './pages/conversations/ListConversations'
import InfoConversations from './pages/conversations/InfoConversation'
import UpdateConversation from './pages/conversations/UpdateConversations'
import ListMessages from './pages/messages/ListMessages'
import CreateMessage from './pages/messages/CreateMessage'
import UpdateMessage from './pages/messages/UpdateMessage'
import CreateLocation from './pages/locations/CreateLocation'
import ListLocations from './pages/locations/ListLocations'
import UpdateLocation from './pages/locations/UpdateLocation'
import CreateCatch from './pages/catches/CreateCatch'
import ListCatch from './pages/catches/ListCatches'
import UpdateCatch from './pages/catches/UpdateCatch'
import CreateSpecie from './pages/species/CreateSpecie'
import ListSpecies from './pages/species/ListSpecies'
import UpdateSpecie from './pages/species/UpdateSpecie'
import CreateLevel from './pages/levels/CreateLevel'
import ListLevels from './pages/levels/ListLevels'
import UpdateLevel from './pages/levels/UpdateLevel'
import AuthLayout from './layouts/AuthLayout'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/init" element={<Init />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={''} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="/listUsers" element={<ListUsers />} />
          <Route path="/users/update/:username" element={<UpdateUser />} />
          <Route path="/users/:username" element={<InfoUser />} />
          <Route path="/listCategories" element={<ListCategories />} />
          <Route path="/categories/create" element={<CreateCategorie />} />
          <Route path="/categories/update/:id" element={<UpdateCategorie />} />
          <Route path="/conversations/create" element={<CreateConversation />} />
          <Route path="/listConversations" element={<ListConversations />} />
          <Route path="/conversations/:id" element={<InfoConversations />} />
          <Route path="/conversations/update/:id" element={<UpdateConversation />} />
          <Route path="/listmessages" element={<ListMessages />} />
          <Route path="/messages/create" element={<CreateMessage />} />
          <Route path="/messages/update/:id" element={<UpdateMessage />} />
          <Route path="/catches/create" element={<CreateCatch />} />
          <Route path="/listcatches" element={<ListCatch />} />
          <Route path="/catches/update/:id" element={<UpdateCatch />} />
          <Route path="/locations/create" element={<CreateLocation />} />
          <Route path="/listLocations" element={<ListLocations />} />
          <Route path="/locations/update/:id" element={<UpdateLocation />} />
          <Route path="/species/create" element={<CreateSpecie />} />
          <Route path="/listSpecies" element={<ListSpecies />} />
          <Route path="/species/update/:id" element={<UpdateSpecie />} />
          <Route path="/levels/create" element={<CreateLevel />} />
          <Route path="/listlevels" element={<ListLevels />} />
          <Route path="/levels/update/:id" element={<UpdateLevel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
