// topic.controller.js
const { TopicModel } = require('../models');


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
