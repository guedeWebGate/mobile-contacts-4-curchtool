const loginFunction = require('./functions/getLoginToken');

exports.handler = function(event, context, callback) {
    const awsDone = awsHelper.awsDone(callback);
    let method = event.httpMethod;
    let pathElements = event.pathParameters && event.pathParameters.proxy;
    let qs = event.queryStringParameters;

    /*
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.username) {
        return awsDone.done(new Error('Unauthorized lambda call. Authorizer is required.'));
    }
    */

    if ('POST' === method && pathElements === '@new') {
        let payload = JSON.parse(event.body);
        return loginFunction.loginFunction(xx, payload.email, payload.password).then();
    }
    awsDone.done(new Error('No Execution defined for: ' + method + " / " + pathElements + " / " + qs));
}