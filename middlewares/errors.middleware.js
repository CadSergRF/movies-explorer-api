const { INTERNAL_SERVER_ERROR } = require('../utils/errorCode.constants');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/message.constants');

module.exports = ((err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = statusCode === INTERNAL_SERVER_ERROR
    ? INTERNAL_SERVER_ERROR_MESSAGE
    : err.message;

  res.status(statusCode).send({ message });
  return next();
});
