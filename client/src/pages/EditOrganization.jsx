import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import '../static/style/main.css'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";


function EditOrganization() {

    const { idOrga } = useParams();
   
    const [topics, setTopics] = useState([]);

    const [organizationDetails, setOrganizationDetails] = useState({});

    const [title, setTitle] = useState(''); 

    const [description, setDescription] = useState('');

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
      
        const organizationPromise = axios.get(`/api/organizations/organizationById/${idOrga}`, { headers });
        const topicsPromise = axios.get('/api/topics', { headers });
        const organizationDetailsPromise = axios.get(`/api/organizations/organizationdetail/${idOrga}`, { headers });
      
        Promise.all([organizationPromise, topicsPromise, organizationDetailsPromise])
          .then(([organizationResponse, topicsResponse, organizationDetailsResponse]) => {
            setTitle(organizationResponse.data.title);
            setDescription(organizationResponse.data.description);
            setTopics(topicsResponse.data);
            setOrganizationDetails(organizationDetailsResponse.data);
          })
          .catch(error => {
            console.error(error);
            window.location.href = '/explore';
          });
      }, []);
      
      useEffect(() => {
        if (topics.length > 0 && organizationDetails) {
          for (let i = 0; i < topics.length; i++) {
            for (let j = 0; j < organizationDetails.length; j++) {
              if (topics[i].idTopic === organizationDetails[j].idTopic) {
                document.querySelector(`input[value="${topics[i].idTopic}"]`).checked = true;
              }
            }
          }
        }
      }, [topics, organizationDetails]);


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
            topics: Array.from(document.querySelectorAll('input[name="topic"]:checked')).map(checkbox => checkbox.value),
            idOrga: idOrga
        };

        if (!data.name || !data.description || data.topics.length === 0) {
            toast.error('Please fill all the fields');
            return;
        }

    
        const headers = {
            authorization: token
        };
    
        axios.post('/api/organizations/update', data, { headers })
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
                <h1 className="title">edit your organization</h1>
                <div className="info_orga">
                    <input type="text" name="name" id="name" onChange={(e) => {setTitle(e.target.value)}} placeholder="organization name" value={title} required/>
                    <input type="text" name="description" id="description" onChange={(e) => {setDescription(e.target.value)}} placeholder="organization description" value={description} required/>
                </div>
                <div className="vertical">

                    <h2 className="subtitle">choose topics for your organisation</h2>
                    {topics.map(topic => (
                        <div className="topicSelection" key={topic.idTopic} onClick={handleCheck} >
                            <input type="checkbox" name="topic" id="topic" value={topic.idTopic}/>
                            <label  >{topic.title} :&nbsp;</label>
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

export default EditOrganization;