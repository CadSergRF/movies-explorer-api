const Movie = require('../models/movie.model');

const { CREATED_CODE } = require('../utils/constants');

// const ForbiddenError = require('../errors/Forbidden.error');
const BadRequestError = require('../errors/BadRequest.error');
const NotFoundError = require('../errors/NotFound.error');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie
    .create(req.body)
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Не корректные данные при создании карточки ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      // if (!movie.owner.equals(req.user._id)) {
      //   throw new ForbiddenError('Вы не можете удалять фильмы');
      // }
      return Movie.deleteOne(movie._id)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан не корректный id для удаления фильма'));
      } else {
        next(err);
      }
    });
};
