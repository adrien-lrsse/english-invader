import React, { useEffect, useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import axios from "axios";

function MyOrganizations(){

    const [myOrganizations, setMyOrganizations] = useState([]);
    const [allOrganizations, setAllOrganizations] = useState([]);
    const [followedOrganizations, setFollowedOrganizations] = useState([]);

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
                setMyOrganizations(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/api/organizations/all', { headers})
            .then(response => {
                setAllOrganizations(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/api/organizations/followed', { headers})
            .then(response => {
                console.log(response.data);
                for (const followedOrganization of response.data) {
                    console.log(followedOrganization.idOrga)
                    setFollowedOrganizations(followedOrganizations => [...followedOrganizations, followedOrganization.idOrga]);
                }
                
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const handleFollow = (i) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // rediriger l'utilisateur vers la page d'accueil s'il n'y a pas de token
            window.location.href = '/';
            return;
        }

        const data = {
            idOrga: allOrganizations[i].idOrga
        };


        axios.post('/api/organizations/follow', data, {
            headers: {
                authorization: token
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleUnfollow = (i) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // rediriger l'utilisateur vers la page d'accueil s'il n'y a pas de token
            window.location.href = '/';
            return;
        }

        const data = {
            idOrga: allOrganizations[i].idOrga
        };

        axios.post('/api/organizations/unfollow', data, {
            headers: {
                authorization: token
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <div>
            <Navbar />
            <div className="divOrga">
            
            <div className="myOrganizations" cl>
                <h1 className="title">my organizations</h1>
                {myOrganizations.map((organization, i) => {
                    return (
                        <div className="own_organization" key={i}>
                            <div className="vertical">
                            <h2>{organization.title}</h2>
                            <p>{organization.description}</p>
                            <button>edit</button>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
            <div className="horizontal horizontal_centering space_between">
            <button className="buttonAction" onClick={() => window.location.href = "/neworganization"}>create a new organization</button>

            </div>

            <div className="myOrganizations">
                <h1 className="title">all organizations</h1>
                {allOrganizations.map((organization, i) => {
                    return (
                        <div className="own_organization" key={i}>
                            <div className="vertical">
                            <h2>{organization.title}</h2>
                            <p>{organization.description}</p>
                            { followedOrganizations.includes(organization.idOrga) ? <button value={"unfollow"} onClick={((event) => {handleUnfollow(i)})}>unfollow</button> : <button value={"follow"} onClick={((event) => {handleFollow(i)})}>follow</button>}
                            
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
        
        
        
    )
}

export default MyOrganizations;