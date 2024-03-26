const { LinkTopicOrgaModel } = require('../models');

exports.create = async (idTopic, idOrga) => {
    LinkTopicOrgaModel.create({
        idOrga: idOrga,
        idTopic: idTopic
    }).then(link => {
        res.status(200).json({ message: "Link created successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}