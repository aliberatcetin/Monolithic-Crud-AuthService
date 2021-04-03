const express = require('express');
const router = express.Router();
//const userService = require('../services/userService');
//var config = require('../config/key');
//var jwt = require('../helpers/jwt');

const authController = require('../controllers/authController');
const validation = require('../helpers/validation');

router.get('/login/facebook/:accessToken',authController.fBLogin);
router.get('/login/google/:accessToken',authController.googleLogin);


module.exports = router;