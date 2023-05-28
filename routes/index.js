const router = require('express').Router();
// const auth = require('../middlewares/auth.middleware');

const userRoutes = require('./users.router');
const movieRoutes = require('./movies.router');

const notFoundRouter = require('./notFound.router');

router
  .use('/users', userRoutes)
  .use('/movies', movieRoutes)
  .use('*', notFoundRouter);
// router
//   .use('/users', auth, userRoutes)
//   .use('movies', auth, movieRoutes)
//   .use('*', auth, notFoundRouter);

module.exports = router;
