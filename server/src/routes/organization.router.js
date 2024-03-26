const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organization.controller');
const authJwt = require('../middleware/authJwt');


router.post('/new', authJwt.verifyToken, OrganizationController.create);
router.get('/', authJwt.verifyToken, OrganizationController.findAll);

module.exports = router;