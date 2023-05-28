require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const allRoutes = require('./routes/index');

const errors = require('./middlewares/errors.middleware');

const app = express();

const PORT = process.env.PORT || 5000;
const { DATABASE } = process.env;

mongoose.connect(DATABASE);

app
  .use(express.json())
  .use('/', allRoutes)
  .use(errors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen port - ${PORT}`);
});
