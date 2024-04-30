import NavBarItem from './NavBarItem'

export default function NavBar() {
  return (
    <>
      <div className="bg-[#323640] w-40 h-auto min-h-screen pt-3">
        <div className="m-auto grid grid-cols-1 mt-5 pr-2 pl-2">
          <NavBarItem link="/users">Utilisateurs</NavBarItem>
          <NavBarItem link="/catches">Prises</NavBarItem>
          <NavBarItem link="/conversations">Conversations</NavBarItem>
          <NavBarItem link="/categories">Catégories</NavBarItem>
          <NavBarItem link="/messages">Messages</NavBarItem>
          <NavBarItem link="/locations">Locations</NavBarItem>
          <NavBarItem link="/species">Species</NavBarItem>
          <NavBarItem link="/levels">Levels</NavBarItem>
        </div>
      </div>
    </>
  )
}
