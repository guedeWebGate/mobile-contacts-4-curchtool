var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient();
var uuid = require('uuid/v1');


exports.saveCTToken = function(email, ctToken) {
    return new Promise(function(resolve, reject) {
        let item = {};
        item.id = email;
        item.cttoken = ctToken;
        documentClient.put({
            TableName: 'cttoken',
            Item: item
        }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.getRefreshToken = function(token) {
    return new Promise(function(resolve, reject) {
        let id = uuid();
        let item = {};
        item.id = id;
        item.authtoken = token;
        documentClient.put({
            TableName: 'refreshtoken',
            Item: item
        }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
};