import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import TopicList from "../components/Topic/TopicList";

import { useState, useEffect } from "react";
import axios from 'axios';


function Explore(){
    
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
        
            axios.get('/api/topics/allTopics', { headers })
            .then(response => {
                console.log(response.data);
                setTopics(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }, []);

        const search = (event) => {
            if(event.keyCode === 13) {
                console.log(event.target.value);

                axios.post('/api/topics/search', {search : event.target.value})
                .then(response => {
                    console.log(response.data);
                    setTopics(response.data);
                })
            }
        }


    
        return (
            <div className="centering_horizontal centering_vertical vertical" style={{marginBottom : '5em'}}>
                <Navbar />
                <h1 className="title">explore</h1>
                <input type="text" placeholder="search" onKeyDown={(search)}  className="search" />
                <TopicList topics={topics} />
            </div>
        )
    }

export default Explore;

