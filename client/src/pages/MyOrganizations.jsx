import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import axios from "axios";

function MyOrganizations(){

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // rediriger l'utilisateur vers la page d'accueil s'il n'y a pas de token
            window.location.href = '/';
            return;
        }

        const headers = {
            authorization: token
        };

        axios.get('/api/organizations', { headers })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>
            <Navbar />
            <div className="divOrga">
            
            <div className="myOrganizations" cl>
                <h1 className="title">my organizations</h1>
                <button className="buttonAction" onClick={() => window.location.href = "/neworganization"}>create a new organization</button>
            </div>
            <div className="myOrganizations">
                <h1 className="title">followed organizations</h1>
            </div>
        </div>
        </div>
        
        
        
    )
}

export default MyOrganizations;