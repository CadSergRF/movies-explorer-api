const jwt = require('jsonwebtoken');

const AuthError = require('../errors/Auth.error');
const { AUTH_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаем из куки

  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError(`${AUTH_MESSAGE}`));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new AuthError(`${AUTH_MESSAGE}`));
  }

  req.user = payload;
  return next();
};
