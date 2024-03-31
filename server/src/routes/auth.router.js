const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { checkDuplicateMail } = require('../middleware/verifySignUp');
const authJwt = require('../middleware/authJwt');
const StreakController = require('../controllers/streak.controller');


router.post('/signup', checkDuplicateMail, AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/getUser', authJwt.verifyToken, AuthController.getUser);

module.exports = router;