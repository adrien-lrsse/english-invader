// topic.controller.js
const { TopicModel, WordModel, LinkTopicOrgaModel, FollowedOrgaModel } = require('../models');
const { Op } = require('sequelize');

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
        res.status(500).json({ message: error.message });
    }
};


exports.getFollowedTopics = async (req, res) => {
    try {
        const followedOrgas = await FollowedOrgaModel.findAll({
            where: {
                idUser: req.userId
            }
        });

        const idOrgas = followedOrgas.map(followedOrga => followedOrga.idOrga);

        const linkTopicOrgas = await LinkTopicOrgaModel.findAll({
            where: {
                idOrga: idOrgas
            }
        });

        const idTopics = linkTopicOrgas.map(linkTopicOrga => linkTopicOrga.idTopic);

        const topics = await TopicModel.findAll({
            where: {
                idTopic: idTopics
            }
        });


        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.searchTopic = async (req, res) => {
    const search = req.body.search ;
  
    if (!search || typeof search !== 'string' || search.trim().length === 0) {
      return res.status(400).json({ message: 'Invalid search query.' });
    }
  
    try {
      const topics = await TopicModel.findAll({
        where: {
          title: {
            [Op.like]: `%${search}%`
          }
        },
        // Add any necessary filters or pagination here
        limit: 10, // Limit the number of results
      });  
      res.json(topics);
    } catch (err) {
      res.status(500).json({ message: 'Server error.' });
    }
  };