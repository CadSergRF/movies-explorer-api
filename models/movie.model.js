const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна создания фильма" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режиссёр фильма" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Длительность фильма" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год выпуска фильма" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "Постер" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: '"Постер к фильму" - не корректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "Трейлер фильма" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: '"Трейлер фильма" - не корректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "Мини постер" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: '"Изображение постера к фильму" - не корректный URL',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "Id пользователя" должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "Id фильма" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "Название фильма (русский)" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "Название фильма (english)" должно быть заполнено'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('movie', movieSchema);
