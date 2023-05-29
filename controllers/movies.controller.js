const Movie = require('../models/movie.model');

const {
  CREATED_CODE,
  BAD_REQUEST_MESSAGE_DATA,
  BAD_REQUEST_MESSAGE_ID,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
} = require('../utils/constants');

const ForbiddenError = require('../errors/Forbidden.error');
const BadRequestError = require('../errors/BadRequest.error');
const NotFoundError = require('../errors/NotFound.error');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`${BAD_REQUEST_MESSAGE_DATA} ${errorMessage}`));
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
        throw new NotFoundError(`${NOT_FOUND_MESSAGE_MOVIE}`);
      }
      if (movie.owner !== req.user._id) {
        throw new ForbiddenError(`${FORBIDDEN_MESSAGE}`);
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${BAD_REQUEST_MESSAGE_ID}`));
      } else {
        next(err);
      }
    });
};
