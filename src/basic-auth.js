var basicAuth = require('basic-auth');

module.exports = function(username, password) {
  return function(req, res, next) {
    // Skip basic auth for options requests
    if (req.method === 'OPTIONS') {
      return next();
    }

    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  };
};
