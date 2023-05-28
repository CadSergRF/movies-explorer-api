// const NotFoundError = require('../errors/NotFoundError');

module.exports.urlNotFound = (req, res, next) => {
  res.send({ message: 'URL не существует' });
  next(new Error('URL не существует'));
  // next(new NotFoundError('URL не существует'));
};
