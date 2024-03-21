import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><a href='/'>🇬🇧 English Invader</a></h1>
            <div className="links">
            <a href="/">Home</a>
                {localStorage.getItem('token') ? (
                    <>
                    <a href="/mytopics">My Topics</a>
                    <a onClick={(event) => {localStorage.removeItem('token')}} href="/">Logout</a></>
                ) :  <a href="/SignIn">Login</a>
            }
                
            </div>
        </nav>
     )

}


export default Navbar;