import {CanvasWord} from "./canvasWord.js";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const proposal = document.getElementById("proposal");
const lifeElement = document.getElementById("life");
const scoreElement = document.getElementById("score");

var x = gameCanvas.width / 2;
var y = 0;

var life = 3;
var score = 0;

var dictionary = new Map([
    ["dog", "chien"],
    ["cat", "chat"],
    ["house", "maison"],
    ["car", "voiture"],
    ["tree", "arbre"],
    ["book", "livre"],
    ["computer", "ordinateur"],
    ["flower", "fleur"],
    ["bird", "oiseau"],
    ["sun", "soleil"],
    ["moon", "lune"],
    ["water", "eau"],
    ["air", "air"],
    ["earth", "terre"],
    ["fire", "feu"],
    ["friend", "ami"],
    ["family", "famille"],
    ["food", "nourriture"],
    ["music", "musique"],
    ["love", "amour"]
]);

var validated = [];
var inGame = [];


function display(){
        ctx.fillStyle = "white";

    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    for (let i = 0; i < inGame.length; i++) {
        ctx.font = "20px Arial";
        ctx.fillText(inGame[i].unknown, inGame[i].posX, inGame[i].posY);
    }
}

function game() {
    // Efface le canvas
    addNewWordInGame(dictionary);
    console.log(inGame);

    var inGameTemp = [];
    for (let i = 0; i < inGame.length; i++) {
        inGame[i].updatePos();
        if (inGame[i].posY >= gameCanvas.height){
            life--;
            lifeElement.innerHTML = "Life : "+life;
        } else {
            inGameTemp.push(inGame[i]);
        }
    }
    inGame = inGameTemp;

    if ((inGame.length === 0 && dictionary.size === 0) || (life === 0) ){
        endGameExecution();
    }


}

// Appelle la fonction game toutes les 10 millisecondes (ou toute valeur souhaitée)
const gameInterval = setInterval(game, 20);
const displayInterval = setInterval(display, 1)

function randomSelection(dictionary){
    // Renvoie une clé aléatoire dans le dictionnaire
    const keys = Array.from(dictionary.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

function addNewWordInGame(dictionary){
    const entierAleatoire = Math.floor(Math.random() * 50) + 1;
    if (entierAleatoire === 1 && dictionary.size !==0) {
        var randomkey = randomSelection(dictionary);
        const word = new CanvasWord(randomkey, dictionary.get(randomkey), Math.floor(Math.random() * (gameCanvas.width - ctx.measureText(dictionary.get(randomkey)).width)-1)  + 1, 0);
        inGame.push(word);
        dictionary.delete(randomkey);
    }
}

proposal.addEventListener("keydown", function (event){
    if (event.key === "Enter"){
        const proposalValue = event.target.value;
        for (let i = 0; i < inGame.length; i++) {
            if (inGame[i].guess === proposalValue){
                event.target.value = "";
                validated.push(inGame[i]);
                inGame.splice(i,1);
                score++;
                scoreElement.innerHTML = "Score : "+score;
            }
        }
    }
})

function endGameExecution(){
    if (validated.length === 20 || life > 0){
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.font = "30px Arial";
        ctx.fillText("You win !", (gameCanvas.width - ctx.measureText("You win !").width)/2, gameCanvas.height/2);
        clearInterval(displayInterval);
        clearInterval(gameInterval);
    } else {
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.font = "30px Arial";
        ctx.fillText("You lost !", (gameCanvas.width - ctx.measureText("You lost !").width)/2, gameCanvas.height/2);
        clearInterval(displayInterval);
        clearInterval(gameInterval);
    }
}