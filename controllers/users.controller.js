const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const { CREATED_CODE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/NotFound.error');
const BadRequestError = require('../errors/BadRequest.error');
const DublicateErrors = require('../errors/Dublicate.error');

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
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

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(CREATED_CODE).send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DublicateErrors('Пользователь с указанным email уже зарегистрирован.'));
        return;
      }
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Не корректные данные при создании пользователя ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
      res.send({ message: 'Вы успешно авторизованы' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка авторизации'));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

module.exports.changeUserInfo = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
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
