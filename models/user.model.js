const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/Auth.error');
const { AUTH_MESSAGE_DATA, VALID_EMAIL_MESSAGE } = require('../utils/message.constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: VALID_EMAIL_MESSAGE,
      },
    },
    password: {
      type: String,
      required: true,
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
              throw new AuthError(AUTH_MESSAGE_DATA);
            }
            // Сравниваем пароли
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  throw new AuthError(AUTH_MESSAGE_DATA);
                }
                return user;
              });
          });
      },
    },
  },
);

module.exports = model('user', userSchema);
