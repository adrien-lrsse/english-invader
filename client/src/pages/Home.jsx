import Navbar from "../components/Navbar/Navbar";
import Auth from "../components/Auth/Auth";
import LaunchGame from "../components/LaunchGame/LaunchGame";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useEffect, useState } from "react";
import PersonnalView from "../components/PersonnalView/PersonnalView";

function Home(){
    
    

    const token = localStorage.getItem('token');

    const [user, setUser] = useState({pseudo: ''});

    
    useEffect(() => {

    if (token){
        const headers = {
            authorization: token,
        };
        axios.get('/api/auth/getUser', { headers })
        .then(response => {
            setUser({pseudo: response.data.pseudo});
            toast.success("You are logged as " + response.data.pseudo);
        })
        .catch(error => {
            toast.error("Error ! Please log in again.");
        });
    }
    }, [token]);


    

    return (
        <div className="Home">
            <Navbar />
            <div className="horizontal space_between vertical" style={{width: '100%', marginTop:'10em'}}>
            {user.pseudo ?  
            <> 
                <div style={{width : '50%', marginLeft : '4%'}}>
                    <LaunchGame />
                </div> 
                <div style={{width : '40%', marginRight : '4%'}}>
                    <PersonnalView pseudo={user.pseudo} /> 
                </div>
            </> : 
                <div style={{width : '60%'}}>
                    <LaunchGame />
                </div> 
        }
            
            </div>
            <Toaster />
        </div>
    )
}

export default Home;