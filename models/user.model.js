const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
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
);

module.exports = model('user', userSchema);
