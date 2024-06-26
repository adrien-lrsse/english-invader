import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import './gameCanvas.css';

class CanvasWord {
  constructor(unknown, guess, posX, posY) {
    this.unknown = unknown;
    this.guess = guess;
    this.posX = posX;
    this.posY = posY;
    this.timestamp = Date.now(); // Ajoutez cette ligne
  }

  updatePos() {
    this.posY++;
  }
}



class GameCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.gameCanvas = React.createRef();
    this.proposal = React.createRef();
    this.lifeElement = React.createRef();
    this.scoreElement = React.createRef();

    this.state = {
      x: 0,
      y: 0,
      life: 3,
      score: 0,
      highScore: 0,
      leaderboard: [],
      dictionary: new Map([
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
      ]),
      validated: [],
      inGame: [],
      failed : [],
    };

    if (this.props.idTopic){
      if (this.props.idTopic !== 0){
        this.fetchWords();
      }
    }
  }

  fetchWords = async () => {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        authorization: token,
      };

      const response = await axios.get(`/api/words/${this.props.idTopic}`, { headers });
      const newDictionary = new Map();
      if (response.data.length === 0) {
        window.location.href = '/game';
      }
      for (let word of response.data) {
        newDictionary.set(word.word_en, word.word_fr);
      }
      this.setState({ dictionary: newDictionary });
    } catch (error) {
      // go to game with default dictionary
      window.location.href = '/game';
      console.error(error);
    }
  }

  async fetchHighScore() {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        authorization: token,
      };

      const response = await axios.get(`/api/games/getHighscoreByUserAndTopic/${this.props.idTopic}`, { headers });


      if (response.data) {
        this.setState({ highScore: response.data.score });
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const headers = {
        authorization: token,
      };
  
      const response = await axios.get(`/api/games/getHighscores/${this.props.idTopic}`, { headers });
  
      if (response.data) {
        const leaderboard = response.data.map(game => ({
          pseudo: game.pseudo,
          score: game.score
        }));
        this.setState({ leaderboard });
      }
    } catch (error) {
      console.error(error);
    }
  }  
  

  async componentDidMount() {
    const ctx = this.gameCanvas.current.getContext("2d");

    this.setState({ x: this.gameCanvas.current.width / 2 });

    ctx.fillStyle = "white";
    ctx.fillText("test", 150,150);


    if (this.props.idTopic !== 0){
    
      await this.fetchWords();
    }
      await this.fetchHighScore();
      await this.fetchLeaderboard();
    

    this.gameInterval = setInterval(() => this.game(ctx), 20);
    this.displayInterval = setInterval(() => this.display(ctx), 0.1);
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
    clearInterval(this.displayInterval);
  }

  display(ctx) {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, this.gameCanvas.current.width, this.gameCanvas.current.height);

    for (let i = 0; i < this.state.inGame.length; i++) {
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(this.state.inGame[i].unknown, this.state.inGame[i].posX, this.state.inGame[i].posY);
    }
  }

  game(ctx) {
    this.addNewWordInGame(ctx);
    const inGameTemp = [];
    for (let i = 0; i < this.state.inGame.length; i++) {
      this.state.inGame[i].updatePos();
      if (this.state.inGame[i].posY > this.gameCanvas.current.height) {
        this.setState((prevState) => ({ life: prevState.life - 1,
          failed: [...prevState.failed, prevState.inGame[i]]}));
        this.lifeElement.current.innerHTML = `❤️ Life : ${this.state.life}`;
      } else {
        inGameTemp.push(this.state.inGame[i]);
      }
    }
  
    this.setState({ inGame: inGameTemp });
    if ((this.state.inGame.length === 0 && this.state.dictionary.size === 0) || this.state.life === 0) {
      clearInterval(this.gameInterval);
      clearInterval(this.displayInterval);
      this.endGameExecution(ctx);
    }
  }
  

  randomSelection(dictionary) {
    const keys = Array.from(dictionary.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }

  addNewWordInGame(ctx) {
    const entierAleatoire = Math.floor(Math.random()*50+1);
    if (entierAleatoire === 1 && this.state.dictionary.size !== 0){
  
        var randomKey = this.randomSelection(this.state.dictionary);
        let newPos;
        let wordWidth = ctx.measureText(this.state.dictionary.get(randomKey)).width;
        let lastWordWidth = this.state.inGame.length > 0 ? ctx.measureText(this.state.inGame[this.state.inGame.length - 1].text).width : 0;        
        do {
          newPos = Math.floor(Math.random() * (this.gameCanvas.current.width - wordWidth - 1)) + 1;
        } while (this.state.inGame.length > 0 && isOverlapping(newPos, wordWidth, this.state.inGame[this.state.inGame.length - 1], lastWordWidth));
  
        const word = new CanvasWord(randomKey, this.state.dictionary.get(randomKey), newPos, 0);
        const newDictionary = this.state.dictionary;
  
        newDictionary.delete(randomKey)
  
        this.setState((prevState) => ({
            inGame: [...prevState.inGame, word],
            dictionary: newDictionary,
          }));
    }
  
    function isOverlapping(newPos, wordWidth, lastWord) {
      const newWordEnd = newPos + wordWidth;
      const lastWordWidth = ctx.measureText(lastWord.text).width;
      const lastWordEnd = lastWord.posX + lastWordWidth;
      return newPos < lastWordEnd && newWordEnd > lastWord.posX;
    }
    
  }
  

  handleProposalKeyDown = (event) => {
    if (event.key === "Enter") {
      const proposalValue = event.target.value;
      const updatedInGame = this.state.inGame.filter((word) => word.guess !== proposalValue);

      if (updatedInGame.length < this.state.inGame.length) {
        const word = this.state.inGame.find((word) => word.guess === proposalValue);
        const timeDiff = Date.now() - word.timestamp;

        if (timeDiff > 0) {
          const scoreIncrement = Math.round(100000 / timeDiff * (this.state.validated.length+1) / (this.state.failed.length + this.state.validated.length + this.state.inGame.length + this.state.dictionary.size)) * word.unknown.length;

          this.setState((prevState) => ({
            inGame: updatedInGame,
            validated: [...prevState.validated, proposalValue],
            score: prevState.score + scoreIncrement,
          }),
          () => {
            this.scoreElement.current.innerHTML = `🎯 Score : ${this.state.score}`;
          });
        }
      }

      event.target.value = "";
    }
  };
  
  updateHighScore = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const headers = {
        authorization: token,
      };
  
      const response = await axios.post('/api/games/updateUserHighscore/' + this.props.idTopic, {score: this.state.score }, { headers });

  
      if (response.data) {
        this.setState({ highScore: response.data.score });
        toast.success('High score updated');
      }
  
    } catch (error) {
      toast.error('Error while updating high score');
      console.error(error);
    }
  }

  updateStreak = async () => {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        authorization: token,
      };


      const response = await axios.post('/api/streak/update',  {}, {headers });


    }
    catch (error) {
      console.error(error);
    }
  }
  
  
  

  endGameExecution(ctx) {
    clearInterval(this.gameInterval);
    clearInterval(this.displayInterval);
  
    if (this.state.score > this.state.highScore) {
      this.updateHighScore();
    }
  
    if (this.state.life > 0) {
      ctx.fillStyle = 'white';
      ctx.clearRect(0, 0, this.gameCanvas.current.width, this.gameCanvas.current.height);
      ctx.font = '30px Arial';
      ctx.fillText('You won !', (this.gameCanvas.current.width - ctx.measureText('You win !').width) / 2, this.gameCanvas.current.height / 2);
    } else {
      ctx.fillStyle = 'white';
      ctx.clearRect(0, 0, this.gameCanvas.current.width, this.gameCanvas.current.height);
      ctx.font = '30px Arial';
      ctx.fillText('You lost !', (this.gameCanvas.current.width - ctx.measureText('You lost !').width) / 2, this.gameCanvas.current.height / 2);
    }

    
    this.fetchLeaderboard();
    this.updateStreak();
  }
  
  

  render() {
    return (
      <div className="horizontal " style={{width: "100%"}} >
        <div className="vertical game_canvas" style={{width: "55%"}}>
          <canvas ref={this.gameCanvas} id="gameCanvas" width={560} height={700} />
          <input ref={this.proposal} type="text" className='input_answer' onKeyDown={this.handleProposalKeyDown} placeholder="guess a word" />
        </div>
        <div className="vertical vertical_item_game" style={{width: "45%"}}>
          <div className="horizontal item_game" >
              <h2 ref={this.lifeElement}>❤️ Life : {this.state.life}</h2>
              <h2 ref={this.scoreElement}>🎯 Score : {this.state.score}</h2>
              <h2>🏆 My High Score : {this.state.highScore}</h2> 
          
          </div>
          <div className="vertical" style={{marginLeft : '1em'}}>
            <div className="item_game">
              <h2>Leaderboard : </h2>
              <ol>
                {this.state.leaderboard.map((entry, index) => (
                  <li key={index}>
                    {entry.pseudo} : {entry.score}
                  </li>
                ))}
              </ol>
            </div>
            {this.state.failed.map((item, i) => (
              <div className="horizontal failed_guess" key={i} style={{marginLeft : '1em'}}>
                <p className="answerFailed"><span>{item.unknown}</span> means <span>{item.guess}</span></p>
                
              </div>
            ))}
          </div>
          
        </div>
      </div>
    );
  }
}


export default GameCanvas;
