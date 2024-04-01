import React, { useEffect, useState} from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import GameCanvas from "../components/Game/GameCanvas";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Game(){

    const {idTopic} = useParams();

    const [topic, setTopic] = useState(0);

    const [GameCanvasViewer, setGameCanvasViewer] = useState(null);

    
    useEffect(() => {
        if (!idTopic) {
            toast('Default topic selected', {
                icon: '🍎'
            });
            setGameCanvasViewer(<GameCanvas idTopic={0} />);
        } else {
            setTopic(idTopic);
            setGameCanvasViewer(<GameCanvas idTopic={idTopic} />);
        }
    }, []);


    return (

        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />
            {GameCanvasViewer ? <GameCanvas idTopic={topic} /> : <h1>Loading...</h1>}
            <Toaster />
        </div>
        
        

    )
}

export default Game;