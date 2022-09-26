function Navbar({setName,simpleData}){
    return <nav>
    <div onClick={setName}>
      <GiCogLock className="settings" size="small" />
    </div>
    <div>{simpleData.username}<img src={mask} alt="mask" /></div>
  </nav>
}