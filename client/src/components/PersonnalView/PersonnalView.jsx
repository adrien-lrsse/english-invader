import React, {useEffect, useState} from "react";
import './personnalView.css';
import axios from "axios";

const PersonnalView = ({pseudo}) => {

    const [streak, setStreak] = useState(0);


    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }

        const headers = {
            authorization: token
        };

        axios.get('/api/streak/me', {headers})
            .then(response => {
                setStreak(response.data.streak);
            })
            .catch(error => {
                console.error(error);
            });
        }, []); 

    return (
        <div className="personnalView">
            <h1>🚀</h1>
        <h2>Welcome back <span className="pseudo">{pseudo}</span> !</h2>
        <div className="streakDiv">
            <h3>🔥</h3>
            <p>Your current streak is <span className="streak">{streak}</span> days.</p>
        </div>
        
        </div>
    );
    }

export default PersonnalView;