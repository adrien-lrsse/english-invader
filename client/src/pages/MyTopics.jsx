import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import TopicList from "../components/Topic/TopicList";
import { useState, useEffect } from "react";


function MyTopics(){

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        document.title = "My Topics";
        fetch('/api/topics')
        .then(response => response.json())
        .then(data => {
            setTopics(data);
        });
    }, []);

    const testData = {
        topics: [
            {
                id: 1,
                title: "Introduction to React",
                description: "Learn the basics of React.js"
            },
            {
                id: 2,
                title: "Advanced JavaScript Concepts",
                description: "Explore advanced topics in JavaScript"
            },
            {
                id: 3,
                title: "CSS Frameworks Comparison",
                description: "Compare popular CSS frameworks"
            },
            {
                id: 4,
                title: "Node.js Backend Development",
                description: "Build scalable server-side applications with Node.js"
            }
        ]
    };
    

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