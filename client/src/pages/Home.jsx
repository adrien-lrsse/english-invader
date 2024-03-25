import Navbar from "../components/Navbar/Navbar";
import Auth from "../components/Auth/Auth";
import LaunchGame from "../components/LaunchGame/LaunchGame";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useEffect } from "react";

function Home(){
    
    

    const token = localStorage.getItem('token');

    
    useEffect(() => {

    if (token){
        const headers = {
            authorization: token,
        };
        axios.get('/api/auth/getUser', { headers })
        .then(response => {
            console.log(response.data.pseudo);
            toast.success("You are logged as " + response.data.pseudo);
        })
        .catch(error => {
            toast.error("Error ! Please log in again.");
        });
    }
    }, [token]);


    

    const name = "Home test";
    const balise = <h1>{name}</h1>;
    return (
        <div className="Home">
            <Navbar />
            <div className="horizontal space_between" style={{width: '100%', marginTop:'5em'}}>
            <LaunchGame />
            </div>
            <Toaster />
        </div>
    )
}

export default Home;