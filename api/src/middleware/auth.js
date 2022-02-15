const config = require('config');
const { getUserSession } = require('../service/userSessionService');

const unprotectedEndpoints = [
  '/v1/login',
  '/v1/sso',
  '/v1/logout',
];

const allowedHosts = [
  new URL(config.locations.apiGateway).hostname,
];

module.exports = async (req, res, next) => {
  if (unprotectedEndpoints.includes(req.path)) {
    next();
  } else if (req.cookies && req.cookies.session) {
    await getUserSession(req.cookies.session);
    next();
  // TODO: MAKE THIS MORE SECURE!!!!
  } else if (allowedHosts.includes(req.hostname)) {
    next();
  } else {
    res.sendStatus(401);
  }
};
