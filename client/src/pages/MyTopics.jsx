import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import TopicList from "../components/Topic/TopicList";
import FollowedTopicList from "../components/Topic/FollowedTopicList";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../static/style/myTopic.css';


function MyTopics(){

    const [topics, setTopics] = useState([]);

    const [followedTopics, setFollowedTopics] = useState([]);

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
                setTopics(response.data);
              })
              .catch(error => {
                console.error(error);
              }); 

              axios.get('/api/topics/followedTopics', { headers })
              .then(response => {
                setFollowedTopics(response.data);
              }).catch(error => {
                console.error(error);
              });
          }, []);


    return (
        <div className="centering_horizontal centering_vertical vertical" style={{marginBottom : '5em'}}>
            <Navbar />
            <h1 className="title">my topics</h1>
             <TopicList topics={topics} display={1}/>
            <button className="add_word" onClick={() => window.location.href = "/topic"}>create a new topic</button>
            <h1 className="title">topics from my followed organizations</h1>
            <FollowedTopicList topics={followedTopics}/>
        </div>
    )
}


export default MyTopics;