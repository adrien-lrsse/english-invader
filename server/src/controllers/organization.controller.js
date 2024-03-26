const { OrganizationModel } = require('../models');
const LinkTopicOrgaController = require('./link_topic_orga.controller');
const FollowedOrgaController = require('./followed_orga.controller');

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


exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationModel.findAll();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.followOrganization = async (req, res) => {
    console.log('Request body:', req.body);
    const idOrga = req.body.idOrga;
    OrganizationModel.findOne({
        where: {
            idOrga: idOrga
        }
    }).then(async organization => {
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        const followedOrga = await FollowedOrgaController.createLink(req, res);
        res.status(200).json({ message: "Organization followed successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}