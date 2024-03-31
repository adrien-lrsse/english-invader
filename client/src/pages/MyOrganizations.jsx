import React, { useEffect, useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import axios from "axios";
import OrganizationList from "../components/Organization/OrganizationList";


function MyOrganizations(){

    const [myOrganizations, setMyOrganizations] = useState([]);
    const [followedOrganizations, setFollowedOrganizations] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }

        const headers = {
            authorization: token
        };

        axios.get('/api/organizations', { headers })
            .then(response => {
                setMyOrganizations(<OrganizationList organizations={response.data} display={2} />);

            })
            .catch(error => {
                console.error(error);
            });

        
        axios.get('/api/organizations/followedOrganizations', { headers})
            .then(response => {
                setFollowedOrganizations(<OrganizationList organizations={response.data} display={1} />);
                
            })
            .catch(error => {
                console.error(error);
            });

    }, [followedOrganizations]);

    return (
        <div>
            <Navbar />
            <div className="divOrga">
            
            <div className="myOrganizations" cl>
                <h1 className="title">my organizations</h1>
                {myOrganizations}
            </div>
            <div className="horizontal horizontal_centering space_between">
            <button className="buttonAction" onClick={() => window.location.href = "/organization/create"}>create a new organization</button>

            </div>

            <div className="myOrganizations">
                <h1 className="title">my followed organizations</h1>
                {followedOrganizations}
            </div>
        </div>
        </div>
        
        
        
    )
}

export default MyOrganizations;