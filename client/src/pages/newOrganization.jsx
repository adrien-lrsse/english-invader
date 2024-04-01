import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import '../static/style/main.css'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function NewOrganization() {
   
    const [topics, setTopics] = useState([]);

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
    
        axios.get('/api/topics', { headers })
            .then(response => {
            setTopics(response.data);
            })
            .catch(error => {
            console.error(error);
            });
        }, []);


    const handleCheck = (event) => {
        const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        };


    const handleSave = (event) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // rediriger l'utilisateur vers la page d'accueil s'il n'y a pas de token
            window.location.href = '/';
            return;
        }

        const data = {
            name: document.querySelector('input[name="name"]').value,
            description: document.querySelector('input[name="description"]').value,
            topics: Array.from(document.querySelectorAll('input[name="topic"]:checked')).map(checkbox => checkbox.value)
        };

        if (!data.name || !data.description || data.topics.length === 0) {
            toast.error('Please fill all the fields');
            return;
        }

    
        const headers = {
            authorization: token
        };
    
        axios.post('/api/organizations/new', data, { headers })
            .then(response => {
            window.location.href = '/myorganizations';
            })
            .catch(error => {
            toast.error('An error occured');
            console.error(error);
            });
        }

    return (
        <div>
            <Navbar />
            <div className="myOrganizations">
                <h1 className="title">create your own organization</h1>
                <div className="info_orga">
                    <input type="text" name="name" id="name" placeholder="organization name" required/>
                    <input type="text" name="description" id="description" placeholder="organization description" required/>
                </div>
                <div className="vertical">

                    <h2 className="subtitle">choose topics for your organisation</h2>
                    {topics.map(topic => (
                        <div className="topicSelection" key={topic.idTopic} onClick={handleCheck}>
                            <input type="checkbox" name="topic" id="topic" value={topic.idTopic}/>
                            <label >{topic.title} :&nbsp;</label>
                            <p className="topicDescription">{topic.description}</p>
                        </div>
                    ))}
                    </div>
                    <div className="horizontal centering_horizontal">

                <button className="buttonSaveNewOrga" onClick={handleSave}>save</button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default NewOrganization;