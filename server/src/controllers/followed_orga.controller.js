const { FollowedOrgaModel } = require('../models');

exports.createLink = async (req, res) => {
    console.log('Request body:', req.body);
    FollowedOrgaModel.create({
        idOrga: req.body.idOrga,
        idUser: req.userId
    }).then(followedOrga => {
        res.status(200).json({ message: "Organization followed successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}


exports.getAllFollowedOrgas = async (req, res) => {
    try {
        const followedOrgas = await FollowedOrgaModel.findAll(
            {
                where: {
                    idUser: req.userId
                }
            }
        );
        res.json(followedOrgas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteLink = async (req, res) => {
    const idOrga = req.body.idOrga;
    FollowedOrgaModel.destroy({
        where: {
            idOrga: idOrga,
            idUser: req.userId
        }
    }).then(() => {
        res.status(200).json({ message: "Organization unfollowed successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.isFollowing = async (req, res) => {
    const idOrga = req.body.idOrga;
    const followedOrga = await FollowedOrgaModel.findOne({
        where: {
            idOrga: idOrga,
            idUser: req.userId
        }
    });
    console.log('Followed orga:', followedOrga);
    if (followedOrga) {
        res.json({ isFollowing: true });
    } else {
        res.json({ isFollowing:  false});
    }
}