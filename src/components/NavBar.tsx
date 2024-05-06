import NavBarItem from './NavBarItem'

export default function NavBar() {
  return (
    <>
      <div className="bg-[#323640] h-full">
        <div className="flex flex-col gap-4 items-center pt-5">
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
