import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><a href='/'>🇬🇧 English Invader</a></h1>
            <div className="links">
                <a href="/">Accueil</a>
                <a href="/login">Login</a>
                <a href="/mytopics">My topics</a>
            </div>
        </nav>
     );

}


export default Navbar;