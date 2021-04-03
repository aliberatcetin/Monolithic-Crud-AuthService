const express = require('express');
const router = express.Router();
//const userService = require('../services/userService');
const jwt = require('../helpers/jwt');
//var config = require('../config/key');
//var jwt = require('../helpers/jwt');

const auth = require('../middlewares/authMiddleware');;
const validation = require('../helpers/validation');
const questionService = require('../services/questionService');
const userService = require('../services/userService');
const notification = require('../helpers/notification');
const mail = require('../helpers/sendMail');
//router.use(auth.isAdmin);

//router.use(mail.notifyNewQuestion);
router.get('/all',getAllQuestions);
router.get('/all/active',getActiveQuestions);
router.get('/all/unactive',gecUnactiveQuestions);
router.post('/reply/:questionId',reply);

function getAllQuestions(req,res){
    
    questionService.getAllQuestions().then(function(allquestions){
        
        res.send(allquestions);
    }).catch(function(err){
        res.status(500).json({
            'error': err
        });
    });
}
function getActiveQuestions(req,res){
    questionService.getActiveQuestions().then(function(activequestions){
        res.send(activequestions);
    }).catch(function(err){
        res.status(500).json({
            'error': err
        });
    });
}
function gecUnactiveQuestions(req,res){
    questionService.getUnactiveQuestions().then(function(unactivequestions){
        res.send(unactivequestions);
    }).catch(function(err){
        res.status(500).json({
            'error': err
        });
    });
}
function reply(req,res){
    questionService.replyQuestionById(req.params.questionId,req.body.reply).then(function(repliedQuestion){
        userService.getUserById(repliedQuestion.user).then(function(user){
            notification.notifyUserByRegistrationToken(user.push_token,"selamlar");
        }).catch(function(err2){
            console.log(err2);
        });
        res.send(repliedQuestion);
    }).catch(function(err){
        res.status(404).json({
            'error': err
        });
    });
}

module.exports = router;