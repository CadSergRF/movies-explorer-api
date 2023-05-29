const NotFoundError = require('../errors/NotFound.error');
const { NOT_FOUND_MESSAGE_URL } = require('../utils/constants');

module.exports.urlNotFound = (req, res, next) => {
  next(new NotFoundError(`${NOT_FOUND_MESSAGE_URL}`));
};
