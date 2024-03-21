const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topic.controller');
const { authJwt } = require('../middleware/index');


router.get('/', authJwt.verifyToken, TopicController.getMyTopics);
router.post('/', TopicController.createTopic);

module.exports = router;