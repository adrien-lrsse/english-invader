// topic.controller.js
const { TopicModel, WordModel } = require('../models');


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
});

exports.getAllTopics = async (req, res) => {
    try {
      const users = await TopicModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

exports.createTopic = (req, res) => {

    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    TopicModel.create({
        title,
        description,
        idUser: req.userId
    }).then(topic => {
        res.status(201).json(topic);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.getMyTopics = async (req, res) => {
    try {
        const topics = await TopicModel.findAll({
            where: {
                idUser: req.userId
            }
        });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTopicDetails = async (req, res) => {
    const idTopic = req.params.topicId;
    console.log('idTopic:', idTopic);

    TopicModel.findOne({
        where: {
            idTopic: idTopic
        }
    })
    .then(topic => {
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Vérification de l'autorisation
        if (topic.idUser !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json(topic);
    })
    .catch(err => {
        console.error('Error getting topic:', err);
        res.status(500).json({ message: err.message });
    });
};

exports.deleteTopic = async (req, res) => {
    const idTopic = req.params.topicId;

    try {
        // Supprimer tous les mots associés à ce sujet
        await WordModel.destroy({
            where: {
                idTopic: idTopic
            }
        });

        // Supprimer le sujet lui-même
        const topic = await TopicModel.findOne({
            where: {
                idTopic: idTopic
            }
        });

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Vérification de l'autorisation
        if (topic.idUser !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await topic.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting topic:', error);
        res.status(500).json({ message: error.message });
    }
};


