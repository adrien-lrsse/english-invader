const { OrganizationModel } = require('../models');
const LinkTopicOrgaController = require('./link_topic_orga.controller');

exports.create = async (req, res) => {
    OrganizationModel.create({
        title: req.body.name,
        description: req.body.description,
        idUser: req.userId
    }).then(organization => {
        res.status(200).json({ message: "Organization created successfully!" });
        req.body.topics.forEach(element => {
            LinkTopicOrgaController.create(element, organization.idOrga);
        });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.findAll = async (req, res) => {
    OrganizationModel.findAll({
        where: {
            idUser: req.userId
        }
    }).then(organizations => {
        res.status(200).json(organizations);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

