// word.controller.js
const { WordModel, TopicModel } = require('../models');



exports.createWord = (req, res) => {
    console.log('Request body:', req.body);
    const wordsData = req.body;

    if (!Array.isArray(wordsData)) {
        return res.status(400).json({ message: 'Request body should be an array of word objects' });
    }

    for (let word of wordsData) {
        console.log('Word:', word);
        if (!word.word_en || !word.word_fr || !word.idTopic) {
            return res.status(400).json({ message: 'word_en, word_fr, and idTopic are required for each word' });
        }
    }

    for (let word of wordsData) {
        
        WordModel.create({
            word_en : word.word_en,
            word_fr : word.word_fr,
            idTopic : word.idTopic
        }).then(word => {
            console.log('Word created:', word);
            res.status(201).json(word);
        }).catch(err => {
            console.error('Error creating word:', err);
            res.status(500).json({ message: err.message });
        });
        
    }
};

exports.getWordsByTopic = (req, res) => {
    const idTopic = req.params.idTopic;
    TopicModel.findOne({
        where: {
            idTopic: idTopic
        }
    }).then(topic => {
        console.log('Topic:', topic);
        if (topic.idUser !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        WordModel.findAll({
            where: {
                idTopic: idTopic
            }
        }).then(words => {
            res.status(200).json(words);
        }).catch(err => {
            console.error('Error getting words:', err);
            res.status(500).json({ message: err.message });
        });
    }).catch(err => {
        console.error('Error getting topic:', err);
        res.status(500).json({ message: err.message });
    });

};

