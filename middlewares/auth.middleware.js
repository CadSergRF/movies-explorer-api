const jwt = require('jsonwebtoken');

const AuthError = require('../errors/Auth.error');
const { AUTH_MESSAGE } = require('../utils/message.constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config.constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError(AUTH_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    return next(new AuthError(AUTH_MESSAGE));
  }

  req.user = payload;
  return next();
};
