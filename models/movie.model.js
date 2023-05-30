const { Schema, model } = require('mongoose');
const validator = require('validator');

const { VALID_URL_MESSAGE } = require('../utils/message.constants');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: VALID_URL_MESSAGE,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: VALID_URL_MESSAGE,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: VALID_URL_MESSAGE,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('movie', movieSchema);
