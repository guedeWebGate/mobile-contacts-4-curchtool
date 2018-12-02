const AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient();
var uuid = require('uuid/v1');
var jwt = require('jsonwebtoken');

exports.refreshToken = function(token, authtoken, secret) {
    return new Promise(function(resolve, reject) {
        var params = {
            TableName: 'refreshtokenj',
            Key: {
                "id": token
            }
        };
        documenhtClient.get(params, function(error, data) {
            if (error) {
                return reject(err);
            }
            if (data.authtoken !== authtoken) {
                return reject({
                    error: 'Authtoken did not match'
                });
            }
            let oldToken = jwt.decode(authtoken);
            let email = oldToken.payload.email;
            let newToken = jwt.sign({
                'email': email
            }, secret, {
                expiresIn: '60m',
                subject: email,
                issuer: 'ch.feg-effretikon'
            });
            let id = uuid();
            let item = {};
            item.id = id;
            item.authtoken = newToken;
            documentClient.put({
                TableName: 'refreshtoken',
                Item: item
            }, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    documentClient.delete(params, function(error, data) {
                        if (error) {
                            console.log("Error during delete of token: " + JSON.stringify(error));
                        }
                    });
                    resolve({
                        refreshtoken: id,
                        accesstoken: newToken
                    });
                }
            });
        });
    });
};