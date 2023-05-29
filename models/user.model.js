const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/Auth.error');
const { AUTH_MESSAGE_DATA } = require('../utils/constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" долдно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Не корректный e-mail',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              throw new AuthError(`${AUTH_MESSAGE_DATA}`);
            }
            // Сравниваем пароли
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  throw new AuthError(`${AUTH_MESSAGE_DATA}`);
                }
                return user;
              });
          });
      },
    },
  },
);

module.exports = model('user', userSchema);
