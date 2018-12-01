const loginFunction = require('./functions/getLoginToken');
const dbAccessFunction = require('./functions/dbAccess');

exports.handler = function(event, context, callback) {
    const awsDone = awsHelper.awsDone(callback);
    let method = event.httpMethod;
    let pathElements = event.pathParameters && event.pathParameters.proxy;
    let qs = event.queryStringParameters;

    const targetUrl = process.env.CT_URL || '';
    const secret = process.env.SECRETE || '';
    if (targetUrl === '' || secret === '') {
        return awsDone.error(new Error('No CT_URL or SECRET defined!'));
    }
    if ('POST' === method) {
        let payload = JSON.parse(event.body);
        return loginFunction.loginFunction(targetUrl, payload.email, payload.password).then(result => {
            let token = result.data.token;
            dbAccessFunction.saveCTToken(payload.email, token).then(data => {
                let jwtToken = loginFunction.loginFunction(payload.email, secret);
                dbAccessFunction.getRefreshToken(jwtToken).then(id => awsDone.done({
                    accesstoken: jwtToken,
                    refreshtoken: id
                }));
            });
        }).catch(error => awsDone.error(error));
    }
    awsDone.error(new Error('No Execution defined for: ' + method + " / " + pathElements + " / " + qs));
};