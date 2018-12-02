const tokenRefresh = require('./functions/tokenrefresh');

exports.handler = function(event, context, callback) {
    const awsDone = awsHelper.awsDone(callback);
    let method = event.httpMethod;
    let pathElements = event.pathParameters && event.pathParameters.proxy;
    let qs = event.queryStringParameters;

    const secret = process.env.SECRETE || '';
    if (secret === '') {
        return awsDone.error(new Error('No CT_URL or SECRET defined!'));
    }
    if ('POST' === method) {
        let payload = JSON.parse(event.body);
        return tokenRefresh.refreshToken(payload.refreshtoken, payload.accesstoken, secret)
            .then(tokenPair => awsDone.done(tokenPair))
            .catch(error => awsDone.error(error));
    }
    awsDone.error(new Error('No Execution defined for: ' + method + " / " + pathElements + " / " + qs));
};