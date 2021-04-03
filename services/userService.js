const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('../helpers/jwt');
module.exports = {
    create,
    login,
    saveToken,
    logout,
    getUserByUserName,
    getUserByToken,
    getUserById,
    saveTokenById,
    subscribeById

};

function create(userParam) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userParam.email }, (err, doc) => {
            if (err || doc == null) {
                const user = new User(userParam);
                user.type = false;
                if (userParam.password) {
                    user.password = crypto.createHash('sha256').update(userParam.password).digest('hex');
                }
                user.save().then(function (res) {
                    var tempUser = {
                        email: res.email,
                        token: res.token,
                        id: res._id
                    }
                    resolve(tempUser);
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject(doc);
            }
        });
    });
}

function saveToken(userParam, token) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({ email: userParam.email }, { $set: { token: token } }, { new: true }, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                var tokenizedUser = {
                    email: doc.email,
                    token: doc.token,
                    authority: doc.authority,
                    fullname: doc.fullname,
                    id: doc._id
                }
                resolve(tokenizedUser);
            }
        });
    });
}
function saveTokenById(id, token) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({ _id: id }, { $set: { token: token } }, { new: true }, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                var tokenizedUser = {
                    email: doc.email,
                    token: doc.token,
                    authority: doc.authority,
                    fullname: doc.fullname,
                    id: doc._id
                }
                resolve(tokenizedUser);
            }
        });
    });
}


function login(userParam) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userParam.email }, (err, user) => {
            if (err || user == null) {
                reject("not found");
            } else {
                var hash = crypto.createHash('sha256').update(userParam.password).digest('hex');
                if (!hash.localeCompare(user.password)) {
                    resolve(user);
                } else {
                    reject("passwrong");
                }
            }
        });
    });
}

function logout(userId) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({ _id: userId }, { $set: { token: null } }).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function getUserByUserName(email) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, (err, doc) => {
            if (err || doc == null) {
                reject(false);
            } else {
                resolve(doc);
            }
        });
    });
}

function subscribeById(id, token) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({ _id: id }, { $set: { push_token: token } }, { new: true }, (err, doc) => {
            if (err || doc==null) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });

}

function getUserById(id) {
    return new Promise(function (resolve, reject) {
        User.findOne({ _id: id }, (err, doc) => {
            if (err || doc == null) {
                reject(false);
            } else {
                resolve(doc);
            }
        });
    });
}
function getUserByToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.decodeToken(token).then(function (user) {
            getUserByUserName(user.email).then(function (foundUser) {
                resolve(foundUser);
            }).catch(function (err) {
                reject(err);
            });
        });
    });
}