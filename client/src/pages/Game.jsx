import React, { useEffect} from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import GameCanvas from "../components/Game/GameCanvas";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Game(){

    const {idTopic} = useParams();

    
    useEffect(() => {
        if (!idTopic) {
            console.log('No topic id');
            toast('Default topic selected', {
                icon: '🍎'
            });
        }
    }, [idTopic]);


    return (
        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />
            <GameCanvas idTopic={idTopic} />
            <Toaster />
        </div>

    )
}

export default Game;