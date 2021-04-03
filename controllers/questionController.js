const questionService = require('../services/questionService');
const userService = require('../services/userService');
const mail = require('../helpers/sendMail');
const jwt = require('../helpers/jwt');
function create(req, res) {
    //console.log(req.headers.authorization);
    questionService.create(req.body, req.headers.authorization).then(function (question) {
        mail.notifyNewQuestion();
        res.send(question);
    }).catch(function (err) {
        res.status(500).json({
            'error': err
        });
    });
}
function getAll(req, res) {
    userService.getUserByToken(req.headers.authorization).then(function (user) {
        questionService.findAllByUser(user).then(function (questions) {
            res.send(questions);
        }).catch(function (err2) {
            console.log(err2);
        });
    }).catch(function (err) {
        console.log(err);
    });
}
function getOne(req, res) {
    questionService.findOneById(req.params.questionId).then(function (question) {
        jwt.decodeToken(req.headers.authorization).then(function (decoded) {
            userService.getUserById(decoded.id).then(function (user) {
                var userID = JSON.stringify(user._id);
                var questionID = JSON.stringify(question.user);

                if (userID == questionID){
                    res.send(question);
                }else if(user.authority){
                    res.send(question);
                }else {
                    res.status(400).json({
                        'error': 'bad'
                    });
                }
            }).catch(function (err3) {
                console.log(err3);
            });


        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        res.status(404).json({
            'error': err
        });
    });
}
module.exports = {
    create,
    getAll,
    getOne
}