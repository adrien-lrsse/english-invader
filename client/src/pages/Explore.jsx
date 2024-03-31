import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import TopicList from "../components/Topic/TopicList";
import OrganizationList from "../components/Organization/OrganizationList";
import '../static/style/explore.css';
import { useState, useEffect } from "react";
import axios from 'axios';


function Explore(){
    

        const [resultView, setResultView] = useState([]);    
        useEffect(() => {
        
            axios.get('/api/topics/allTopics')
            .then(response => {
                setResultView([<TopicList topics={response.data} />]);
            })
            .catch(error => {
                console.error(error);
            });
        }, []);

        const search = (event) => {
            if (event.keyCode === 13) {
                console.log(event.target.value);
                const type = document.getElementById('category').value;
                if (type === 'topics') {    
                    axios.post('/api/topics/search', { search: event.target.value })
                        .then(response => {
                            setResultView([<TopicList topics={response.data} />]);
                        });
                } else {
                    axios.post('/api/organizations/search', { search: event.target.value })
                        .then(response => {
                            setResultView([<OrganizationList organizations={response.data} display={1}/>]);
                        });
                }
            }
    }


    
        return (
            <div className="centering_horizontal centering_vertical vertical" style={{marginBottom : '5em'}}>
                <Navbar />
                <h1 className="title">explore</h1>
                <div className="horizontal" style={{marginBottom : '2em'}}>
                <select className="selectionSearch" name="category" id="category">
                    <option value="topics">by topics</option>
                    <option value="organizations">by organizations</option>
                </select>
                <input className="inputSearch" type="text" placeholder="search" onKeyDown={(search)} />
                </div>
                {resultView}
            </div>
        )
    }

export default Explore;

