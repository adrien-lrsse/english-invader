import React from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";

function Game(){
    return (
        <div className="centering_horizontal centering_vertical vertical">
            <Navbar />

            <div className="horizontal space_between" style={{ width: '480px' }}>
                <h2 id="life">Life : 3</h2>
                <h2 id="score">Score : 0</h2>
            </div>
            <canvas id="gameCanvas" width="480" height="640"></canvas>
            <input id="proposal" className="input_answer" placeholder="propostion" />
        </div>

    )
}

export default Game;