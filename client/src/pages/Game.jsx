import React, { useEffect, useState} from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import GameCanvas from "../components/Game/GameCanvas";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Game(){

    const {idTopic} = useParams();

    const [topic, setTopic] = useState(0);

    
    useEffect(() => {
        if (!idTopic) {
            console.log('No topic id');
            toast('Default topic selected', {
                icon: '🍎'
            });
        } else {
            setTopic(idTopic);
        }
    }, [idTopic]);


    return (
        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />
            <GameCanvas idTopic={topic} />
            <Toaster />
        </div>

    )
}

export default Game;