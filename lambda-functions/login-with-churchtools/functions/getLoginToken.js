const request = require('request');
const jwt = require('jsonwebtoken');
exports.getLoginToken = function(endpoint, email, password) {
    return new Promise(function(resolve, reject) {
        let payload = {
            'func': 'getUserLoginToken',
            'email': email,
            'password': password
        };
        let caller = endpoint + 'index.php?q=login/ajax';
        request.post(caller, {
            form: payload
        }, function(error, response, body) {
            if (error) {
                return reject(new Error(error));
            }
            let result = JSON.parse(body);
            if (result.status === 'success') {
                return resolve(result);
            } else {
                return reject(result);
            }
        });
    });
};
exports.buildJWT = function(email, secret) {
    return jwt.sign({
        'email': email
    }, secret, {
        expiresIn: '60m',
        subject: email,
        issuer: 'ch.feg-effretikon'
    });
};