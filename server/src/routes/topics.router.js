const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topic.controller');
const { authJwt } = require('../middleware/index');

// Route pour récupérer les sujets de l'utilisateur
router.get('/', authJwt.verifyToken, TopicController.getMyTopics);

// Route pour créer un nouveau sujet
router.post('/', authJwt.verifyToken, TopicController.createTopic);

// Nouvelle route pour obtenir les détails d'un sujet spécifique (pour la modification)
router.get('/:topicId', authJwt.verifyToken, TopicController.getTopicDetails);

// Route pour supprimer un sujet existant
router.delete('/:topicId', authJwt.verifyToken, TopicController.deleteTopic);

module.exports = router;
