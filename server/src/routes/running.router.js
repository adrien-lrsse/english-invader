const express = require('express');
const router = express.Router();
const RunningController = require('../controllers/running.controller');

router.get('/status', RunningController.getStatus);
router.get('/users', RunningController.getAllUsers);

module.exports = router;