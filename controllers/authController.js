const requestPromise = require('request-promise');
const userService = require('../services/userService');
const uuidv1 = require('uuid/v1');
const jwt = require('../helpers/jwt');
function verifyFbAccessToken(access_token) {
    return new Promise(function (resolve, reject) {
        var url = 'https://graph.facebook.com/me?access_token=' + access_token;
        var options = { url: url, method: "GET" };
        requestPromise(options).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject("token is not valid");
        });
    });
}

function fBLogin(req, res) {
    verifyFbAccessToken(req.params.accessToken).then(function (user) {
        var tempPass = uuidv1();
        user = JSON.parse(user);
        var tempEmail = user.id + '@facebook.com';
        var tempUser = {
            email: tempEmail,
            password: tempPass,
            fullname: user.name
        }
        userService.create(tempUser).then(function (loginedFBUser) {
            var token = jwt.createToken(loginedFBUser.email, loginedFBUser._id);
            
            userService.saveTokenById(loginedFBUser.id, token).then(function (tokenizedUser) {
                res.status(200).json({
                    'user': tokenizedUser, 'error': null
                });
            }).catch(function (err3) {
                console.log(err3);
            });
        }).catch(function (oldUser) {
            var token = jwt.createToken(oldUser.email, oldUser._id);
            userService.saveTokenById(oldUser._id, token).then(function (tokenizedUser) {
                res.status(200).json({
                    'user': tokenizedUser, 'error': null
                });
            }).catch(function (err3) {
                res.status(500).json({
                    'user': null, 'error': err3
                });
            });
        });
    }).catch(function (err) {
        res.status(400).json({
            'error': err
        });
    });
}

function verifyGoogleAccessToken(access_token){
    return new Promise(function (resolve, reject) {
        var url = 'https://www.googleapis.com/oauth2/v2/tokeninfo?id_token=' + access_token;
        var options = { url: url, method: "GET" };
        requestPromise(options).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject("token is not valid");
        });
    });
}

function googleLogin(req,res){
    verifyGoogleAccessToken(req.params.accessToken).then(function (user) {
        var tempPass = uuidv1();
        user = JSON.parse(user);
        var tempEmail = user.email;
        var tempUser = {
            email: tempEmail,
            password: tempPass,
            fullname: tempEmail
        }
        userService.create(tempUser).then(function (loginedFBUser) {
            var token = jwt.createToken(loginedFBUser.email, loginedFBUser._id);
            
            userService.saveTokenById(loginedFBUser.id, token).then(function (tokenizedUser) {
                res.status(200).json({
                    'user': tokenizedUser, 'error': null
                });
            }).catch(function (err4) {
                console.log(err4);
            });
        }).catch(function (oldUser) {
            var token = jwt.createToken(oldUser.email, oldUser._id);
            userService.saveTokenById(oldUser._id, token).then(function (tokenizedUser) {
                res.status(200).json({
                    'user': tokenizedUser, 'error': null
                });
            }).catch(function (err3) {
                res.status(500).json({
                    'user': null, 'error': err3
                });
            });
        });
    }).catch(function (err) {
        res.status(400).json({
            'error': err
        });
    });
}

module.exports = {
    fBLogin,
    googleLogin
}