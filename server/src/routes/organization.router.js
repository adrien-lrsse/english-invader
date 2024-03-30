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
router.post('/search', OrganizationController.searchOrganizations);
router.get('/organizationdetail/:idOrga', OrganizationController.getOrganizationDetails);
router.get('/organizationById/:idOrga', OrganizationController.getOrganizationById);
router.get('/followedOrganizations', authJwt.verifyToken, OrganizationController.getFollowedOrganizations);
router.post('/isFollowing', authJwt.verifyToken, FollowedOrgaController.isFollowing);

module.exports = router;