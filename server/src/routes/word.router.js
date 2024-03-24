const express = require('express');
const router = express.Router();
const WordController = require('../controllers/word.controller');
const authJwt = require('../middleware/authJwt');

router.post('/', WordController.createWord);
router.get('/:idTopic', authJwt.verifyToken, WordController.getWordsByTopic);

module.exports = router;