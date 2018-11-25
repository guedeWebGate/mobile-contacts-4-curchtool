const request = require('request');
exports.getLoginToken = function(endpoint, email, password) {
    return new Promise(function(resolve, reject) {
        let payload = {
            'func': 'getUserLoginToken',
            'email': email,
            'password': password
        }
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
}