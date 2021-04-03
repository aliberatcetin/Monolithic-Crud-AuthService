const request = require('request');
const settings = require('../config/settings');
function notifyUserByRegistrationToken(pushToken, data) {
        const apiKey = settings.fireBaseApiToken
        request({
            url: "https://fcm.googleapis.com/fcm/send",
            method: "POST",
            headers: {
                'Content-Type': ' application/json',
                'Authorization': 'key=' + apiKey
            },
            body: JSON.stringify({
                "data": {
                    "data": data
                },
                "to": pushToken
            })
        }, function (error, response, body) {
            console.log("Error : " + error);
            console.log("Response : " + response);
            console.log("Notification Body : " + body);
            if (error) {
                console.log(error);
            }
            else {
                console.log("done");
            }
        });
  

}

module.exports = {
    notifyUserByRegistrationToken
}