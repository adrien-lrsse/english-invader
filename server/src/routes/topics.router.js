const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topic.controller');

router.get('/', TopicController.getAllTopics);

module.exports = router;