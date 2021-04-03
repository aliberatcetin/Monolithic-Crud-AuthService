const express = require('express');
const router = express.Router();
//const userService = require('../services/userService');
//var config = require('../config/key');
//var jwt = require('../helpers/jwt');

const questionController = require('../controllers/questionController');
const validation = require('../helpers/validation');
const auth = require('../middlewares/authMiddleware');

router.post('/',auth.isLoggedin,validation.validateQuestionForm,questionController.create);
router.get('/all',auth.isLoggedin,questionController.getAll);
router.get('/:questionId',auth.isLoggedin,questionController.getOne);


module.exports = router;