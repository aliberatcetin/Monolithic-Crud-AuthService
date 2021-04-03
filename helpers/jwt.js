const jwt = require('jsonwebtoken');
const secret = require('../config/settings').secret;
const User = require('../models/user');
module.exports = {
    createToken,
    verifyToken,
    decodeToken
};

function createToken(email, id) {
    var timestamp = Math.floor(new Date() / 1000);
    var payload = {
        email: email,
        id: id,
        iat: timestamp
    }
    var token = jwt.sign(payload, secret, {
        expiresIn: '360d'
    });
    return token;
}

function verifyToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) reject(false);
            User.findOne({email: decoded.email}, function (err, user) {
                if (err)
                    reject(false);
                if (user == null) {
                    reject(false);
                } else {
                    if (user.token != null && !user.token.localeCompare(token)) {
                        resolve(user);
                    } else {
                        reject(false);
                    }
                }
            });
        });
    });
}

function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) reject(null);
            resolve(decoded);
        });
    });
}