const loginFunction = require('../functions/getLoginToken');

loginFunction.getLoginToken(process.argv[2], process.argv[3], process.argv[4]).then(result => console.dir(result)).catch(error => console.dir(error));