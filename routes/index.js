const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');

const signupRouter = require('./signup.router');
const signinRouter = require('./signin.router');
const signoutRouter = require('./signout.router');
const userRoutes = require('./users.router');
const movieRoutes = require('./movies.router');
const notFoundRouter = require('./notFound.router');

router
  .use('/api/signup', signupRouter)
  .use('/api/signin', signinRouter)
  .use('/api/signout', auth, signoutRouter)
  .use('/api/users', auth, userRoutes)
  .use('/api/movies', auth, movieRoutes)
  .use('*', auth, notFoundRouter);

module.exports = router;
