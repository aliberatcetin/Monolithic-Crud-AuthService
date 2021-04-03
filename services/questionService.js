const Question = require('../models/question');
const categoryService = require('./categoryService');
const userService = require('./userService');
const Enum = require('enum');
const myEnum = new Enum({'Question Type': 1, 'Question Type': 2});
const shortid = require('shortid');

function create(question, token) {
    return new Promise(function (resolve, reject) {
        var tempQ = new Question({ email: question.email, text: question.text });
        categoryService.create(question.type).then(function (category) {
            userService.getUserByToken(token).then(function (user) {
                tempQ.user = user._id;
                tempQ.typeName = myEnum.get(category.type).key;
                tempQ.category = category._id;
                tempQ.username = user.fullname;
                tempQ.fileCode = shortid.generate();
                tempQ.save().then(function (saved) {
                    resolve(saved);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err3) {
                reject(err3);
            });
        });
    });
}
function findAllByUser(user) {
    query={};
    query.sort={createdAt:-1};
    return new Promise(function (resolve, reject) {
        Question.find({ user: user._id },{},query).then(function (questions) {
            resolve(questions);
        });
    });
}
function replyQuestionById(questionId,replyText){
    return new Promise(function(resolve,reject){
        Question.findOneAndUpdate({ _id: questionId }, { $set: { answer: replyText,isActive:false } },{new:true}).then(function(rq){
            resolve(rq);
        }).catch(function(err){
            reject("question not found");
        });
    });
}
function getAllQuestions(){

    query={};
    query.sort={createdAt:-1};
    return new Promise(function(resolve,reject){
        Question.find({},{},query).then(function(questions){
            resolve(questions);
        }).catch(function(err){
            reject(err);
        })
    });
}
function getActiveQuestions(){
    query={};
    query.sort={createdAt:-1};
    return new Promise(function(resolve,reject){
        Question.find({isActive:true},{},query).then(function(questions){
            resolve(questions);
        }).catch(function(err){
            reject(err);
        })
    });
}
function getUnactiveQuestions(){
    query={};
    query.sort={createdAt:-1};
    return new Promise(function(resolve,reject){
        Question.find({isActive:false},{},query).then(function(questions){
            resolve(questions);
        }).catch(function(err){
            reject(err);
        })
    });
}
function findOneById(id){
    return new Promise(function(resolve,reject){
        Question.findById(id).then(function(question){
            resolve(question);
        }).catch(function(err){
            reject(err);
        });
    });
}

module.exports = {
    create,
    findAllByUser,
    replyQuestionById,
    getAllQuestions,
    getActiveQuestions,
    getUnactiveQuestions,
    findOneById
}