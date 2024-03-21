import Navbar from "../components/Navbar/Navbar";
import Auth from "../components/Auth/Auth";
import LaunchGame from "../components/LaunchGame/LaunchGame";

function Home(){
    const name = "Home test";
    const balise = <h1>{name}</h1>;
    return (
        <div className="Home">
            <Navbar />
            <div className="horizontal space_between" style={{width: '100%', marginTop:'5em'}}>
            <LaunchGame />
            </div>
            
        </div>
    )
}

export default Home;