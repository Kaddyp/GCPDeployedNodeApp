const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get User Profile
router.post('/profile', authMiddleware.verifyUser, userController.getUserProfile);
//router.post('/profile', userController.getUserProfile);


module.exports = router;