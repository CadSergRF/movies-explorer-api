const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const { CREATED_CODE } = require('../utils/errorCode.constants');

const {
  BAD_REQUEST_MESSAGE_DATA,
  BAD_REQUEST_MESSAGE_ID,
  DUPLICATE_MESSAGE_EMAIL,
  NOT_FOUND_MESSAGE_USER,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
} = require('../utils/message.constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config.constants');

const NotFoundError = require('../errors/NotFound.error');
const BadRequestError = require('../errors/BadRequest.error');
const DublicateErrors = require('../errors/Dublicate.error');

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
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
        next(new DublicateErrors(DUPLICATE_MESSAGE_EMAIL));
        return;
      }
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`${BAD_REQUEST_MESSAGE_DATA} ${errorMessage}`));
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
        NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
      res.send({ message: LOGIN_MESSAGE });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: LOGOUT_MESSAGE });
};

module.exports.changeUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DublicateErrors(DUPLICATE_MESSAGE_EMAIL));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
      } else {
        next(err);
      }
    });
};
