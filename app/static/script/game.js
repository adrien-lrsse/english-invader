import {CanvasWord} from "./canvasWord.js";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const proposal = document.getElementById("proposal")

var x = gameCanvas.width / 2;
var y = 0   ;

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


    for (let i = 0; i < inGame.length; i++) {
        inGame[i].updatePos();
    }


}

// Appelle la fonction game toutes les 10 millisecondes (ou toute valeur souhaitée)
setInterval(game, 20);
setInterval(display, 1)

function randomSelection(dictionary){
    // Renvoie une clé aléatoire dans le dictionnaire
    const keys = Array.from(dictionary.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

function addNewWordInGame(dictionary){
    const entierAleatoire = Math.floor(Math.random() * 50) + 1;
    if (entierAleatoire === 1 && dictionary.size !==0) {
        var randomkey = randomSelection(dictionary);
        const word = new CanvasWord(randomkey, dictionary.get(randomkey), Math.floor(Math.random() * gameCanvas.width) + 1, 0);
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
                inGame.splice(i,1)
            }
        }
    }
})