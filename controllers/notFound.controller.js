const NotFoundError = require('../errors/NotFound.error');

module.exports.urlNotFound = (req, res, next) => {
  res.send({ message: 'URL не существует' });
  next(new NotFoundError('URL не существует'));
};
