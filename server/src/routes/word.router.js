const express = require('express');
const router = express.Router();
const WordController = require('../controllers/word.controller');

router.post('/', WordController.createWord);

module.exports = router;