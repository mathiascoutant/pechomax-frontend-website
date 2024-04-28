import NavBarItem from './NavBarItem'

export default function NavBar() {
  return (
    <>
      <div className="bg-[#323640] w-40 h-screen pt-3">
        <div className="m-auto grid grid-cols-1 mt-5 pr-2 pl-2">
          <NavBarItem link="/listUsers">Utilisateurs</NavBarItem>
          <NavBarItem link="/listCatches">Prises</NavBarItem>
          <NavBarItem link="/listConversations">Conversations</NavBarItem>
          <NavBarItem link="/listcategories">Catégories</NavBarItem>
          <NavBarItem link="/listmessages">Messages</NavBarItem>
          <NavBarItem link="/listlocations">Locations</NavBarItem>
          <NavBarItem link="/listspecies">Species</NavBarItem>
          <NavBarItem link="/listlevels">Levels</NavBarItem>
        </div>
      </div>
    </>
  )
}
