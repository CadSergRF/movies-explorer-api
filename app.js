require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const celebrateErrors = require('celebrate').errors;

const allRoutes = require('./routes/index');

const errors = require('./middlewares/errors.middleware');
const { requestLogger, errorLogger } = require('./middlewares/logger.middleware');
const rateLimiter = require('./middlewares/rateLimiter.middleware');

const ALLOWED_CORS = require('./utils/cors.constants');

const app = express();

const { PORT, DATABASE } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config.constants');

mongoose.connect(DATABASE || DEFAULT_DATABASE);

app
  .use(express.json())
  .use(cors({
    origin: ALLOWED_CORS,
    credentials: true,
  }))
  .use(helmet())
  .use(cookieParser())
  .use(requestLogger)
  .use(rateLimiter)
  .use('/', allRoutes)
  .use(errorLogger)
  .use(celebrateErrors())
  .use(errors);

app.listen(PORT || DEFAULT_PORT);
