const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { checkDuplicateMail } = require('../middleware/verifySignUp');


router.post('/signup', checkDuplicateMail, AuthController.signup);
router.post('/signin', AuthController.signin);

module.exports = router;