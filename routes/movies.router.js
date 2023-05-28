const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.controller');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer
// nameRU, nameEN и thumbnail, movieId
router.post('/', createMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', deleteMovie);

module.exports = router;
