// word.controller.js
const { WordModel, TopicModel, FollowedOrgaModel } = require('../models');



exports.createWord = (req, res) => {
    const wordsData = req.body;

    if (!Array.isArray(wordsData)) {
        return res.status(400).json({ message: 'Request body should be an array of word objects' });
    }

    for (let word of wordsData) {
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
            res.status(201).json(word);
        }).catch(err => {
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
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        WordModel.findAll({
            where: {
                idTopic: idTopic
            }
        }
        ).then(words => {
            res.status(200).json(words);
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });

};

