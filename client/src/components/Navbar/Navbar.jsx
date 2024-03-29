import './navbar.css';
import toast, { Toaster } from 'react-hot-toast'
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><a href='/'>🇬🇧 english invader.</a></h1>
            <div className="links">
            <a href="/">Home</a>
            <a href="/explore">Explore</a>
                {localStorage.getItem('token') ? (
                    <>
                    <a href="/myorganizations">My Organizations</a>
                    <a href="/mytopics">My Topics</a>
                    <a onClick={(event) => {localStorage.removeItem('token') }} href="/">Logout</a></>
                ) :  <a href="/SignIn">Login</a>
            }
                
            </div>
        </nav>
     )

}


export default Navbar;