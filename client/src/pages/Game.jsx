import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import GameCanvas from "../components/Game/GameCanvas";

function Game(){

    return (
        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />
            <GameCanvas />
        </div>

    )
}

export default Game;