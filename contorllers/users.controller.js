/* eslint-disable no-unused-vars */

const User = require('../models/user.model');
const NotFoundError = require('../errors/NotFound.error');
const BadRequestError = require('../errors/BadRequest.error');

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('UserController: Пользователь с указанным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('UserController: Передан не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.changeUserInfo = (req, res, data, next) => {
  User
    .findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('UserController: Ошибка обновления профиля. Пользователь не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`UserController: Не корректные данные для обновления профиля ${errorMessage}`));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('UserController: Не корректный id. Пользователь не найден'));
      } else {
        next(err);
      }
    });
};
