const { OrganizationModel, TopicModel, LinkTopicOrgaModel, FollowedOrgaModel } = require('../models');
const LinkTopicOrgaController = require('./link_topic_orga.controller');
const FollowedOrgaController = require('./followed_orga.controller');
const { Op } = require('sequelize');

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

exports.getFollowedOrganizations = async (req, res) => {
    
    FollowedOrgaModel.findAll({
        where: {
            idUser: req.userId
        }
    }).then(followedOrgas => {   
        try {
          OrganizationModel.findAll({
            where: {
              idOrga: followedOrgas.map(followedOrga => followedOrga.idOrga)
            }
          }).then(organizations => {
            res.status(200).json(organizations);
          }).catch(err => {
            res.status(500).json({ message: err.message });
          });
        } catch (err) {
          // Handle the error here
          res.status(500).json({ message: err.message });
        }
    }
    ).catch(err => {
        res.status(500).json({ message: err.message });
    }
    );
        
  }


exports.searchOrganizations = async (req, res) => {
    console.log('Request body:', req.body);
    const search = req.body.search;
    OrganizationModel.findAll({
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        }
    }).then(organizations => {
        res.status(200).json(organizations);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.getOrganizationDetails = async (req, res) => {
    const idOrga = req.params.idOrga;
  
    LinkTopicOrgaModel.findAll({
      where: {
        idOrga: idOrga
      }
    }).then(organization => {
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      const topicIds = organization.map(topic => topic.idTopic);
  
      TopicModel.findAll({
        where: {
          idTopic: topicIds
        }
      }).then(topics => {
        res.status(200).json(topics);
      }).catch(err => {
        res.status(500).json({ message: err.message });
      });
    }).catch(err => {
      res.status(500).json({ message: err.message });
    });
    }
  

  exports.getOrganizationById = async (req, res) => {
    const idOrga = req.params.idOrga;
    OrganizationModel.findOne({
      where: {
        idOrga: idOrga
      }
    }).then(organization => {
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.status(200).json(organization);
    }).catch(err => {
      res.status(500).json({ message: err.message });
    });
  }

  exports.updateOrganization = async (req, res) => {
    console.log('Request body:', req.body);
    const idOrga = req.body.idOrga;
    console.log('ID:', idOrga);
    OrganizationModel.update({
      title: req.body.name,
      description: req.body.description
    }, {
      where: {
        idOrga: idOrga
      }
    }).then(() => {
      res.status(200).json({ message: "Organization updated successfully!" });
      LinkTopicOrgaModel.destroy({
        where: {
          idOrga: idOrga
        }
      }).then(() => {
        req.body.topics.forEach(element => {
          LinkTopicOrgaController.create(element, idOrga);
        });
      }
      ).catch(err => {
        res.status(500).json({ message: err.message });
      });
    }
    ).catch(err => {
      res.status(500).json({message: err.message});
    });
  }