import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import '../static/style/myOrganizations.css';
import '../static/style/main.css'
import axios from "axios";
import TopicList from "../components/Topic/TopicList";
import { useParams } from "react-router";


function ViewOrganization() {

    const [topics, setTopics] = useState([]);
    const { idOrga } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
    
        axios.get('/api/organizations/organizationdetail/' + idOrga)
            .then(response => {
            setTopics(response.data);
            })
            .catch(error => {
            console.error(error);
            });

        axios.get('/api/organizations/organizationById/' + idOrga)
            .then(response => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            })
            .catch(error => {
            console.error(error);
            });
        }, []);

    return (
        <div className="centering_horizontal centering_vertical vertical" style={{marginBottom : '5em'}}>
            <Navbar />
            <h1 className="title">organization : {title}</h1>
            <div className="descriptionDiv">
                <p className="description">{description}</p>
            </div>
            <TopicList topics={topics} />
        </div>
    )
}

export default ViewOrganization;
