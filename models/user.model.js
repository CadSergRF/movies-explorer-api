const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/Auth.error');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
    },
    email: {
      type: String,
      required: [true, 'Полу "email" долдно быть заполнено'],
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
              throw new AuthError('Неправильные почта или пароль');
            }
            // Сравниваем пароли
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  throw new AuthError('Неправильные почта или пароль');
                }
                return user;
              });
          });
      },
    },
  },
);

module.exports = model('user', userSchema);
