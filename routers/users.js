const express = require('express');
const router = express.Router();
const jwt = require('../helpers/jwt');

const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');;
const validation = require('../helpers/validation');

router.post('/register',validation.validateUserForm,userController.register);
router.post('/login',validation.validateLoginForm,userController.login);
router.get('/logout',auth.isLoggedin,userController.logout);
router.get('/subscribe/:userid/:token',auth.isLoggedin,userController.subscribe);

module.exports = router;