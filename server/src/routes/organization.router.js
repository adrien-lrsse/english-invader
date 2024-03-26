const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organization.controller');
const FollowedOrgaController = require('../controllers/followed_orga.controller');
const authJwt = require('../middleware/authJwt');


router.post('/new', authJwt.verifyToken, OrganizationController.create);
router.get('/', authJwt.verifyToken, OrganizationController.findAll);
router.get('/all', OrganizationController.getAllOrganizations);
router.post('/follow', authJwt.verifyToken, OrganizationController.followOrganization);
router.get('/followed', authJwt.verifyToken, FollowedOrgaController.getAllFollowedOrgas);
router.post('/unfollow', authJwt.verifyToken, FollowedOrgaController.deleteLink);

module.exports = router;