const express = require('express');
const router = express.Router();
const StreakController = require('../controllers/streak.controller');
const authJwt = require('../middleware/authJwt');

router.get('/me', authJwt.verifyToken, StreakController.getStreak);
router.post('/update', authJwt.verifyToken, StreakController.updateStreak);

module.exports = router;