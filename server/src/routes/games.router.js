const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game.controller');
const { authJwt } = require('../middleware/index');

router.get('/getHighscores/:idTopic', authJwt.verifyToken, GameController.getHighScores);
router.post('/addHighscore', authJwt.verifyToken, GameController.addHighScore);
router.get('/getHighscoreByUserAndTopic/:idTopic', authJwt.verifyToken, GameController.getHighScoreByUserAndTopic);
router.post('/updateUserHighscore/:idTopic', authJwt.verifyToken, GameController.updateUserHighscore);  

module.exports = router;

