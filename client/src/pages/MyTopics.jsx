import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import TopicList from "../components/Topic/TopicList";
import { useState, useEffect } from "react";
import axios from 'axios';


function MyTopics(){

    const [topics, setTopics] = useState([]);

        //
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
                console.log(response.data);
                setTopics(response.data);
              })
              .catch(error => {
                console.error(error);
              });
          }, []);


    return (
        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />
            <h1>My topics</h1>
             <TopicList topics={topics} />
            <button className="saveButton" onClick={() => window.location.href = "/topic"}>
                <span>Create a new topic</span>
                
            </button>
        </div>
    )
}


export default MyTopics;