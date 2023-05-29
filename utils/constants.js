const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const AUTH_ERROR_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const DUPLICATE_KEY_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

const AUTH_MESSAGE = 'Необходима авторизация';
const AUTH_MESSAGE_DATA = 'Неправильные почта или пароль';
const BAD_REQUEST_MESSAGE_DATA = 'Переданы не корректные данные';
const BAD_REQUEST_MESSAGE_ID = 'Передан не корректный Id';
const DUPLICATE_MESSAGE_EMAIL = 'Пользователь с указанным email уже зарегистрирован.';
const FORBIDDEN_MESSAGE = 'Вы не можете удалять чужие фильмы';
const NOT_FOUND_MESSAGE_MOVIE = 'Фильм не найден';
const NOT_FOUND_MESSAGE_USER = 'Пользователь не найден';
const NOT_FOUND_MESSAGE_URL = 'URL не существует';

const ALLOWED_CORS = [
  'http://movies-csrf.nomoredomains.rocks',
  'https://movies-csrf.nomoredomains.rocks',
  'http://api.movies-csrf.nomoredomains.rocks',
  'https://api.movies-csrf.nomoredomains.rocks',
  'http://51.250.5.121',
  'https://51.250.5.121',
];

const URL_REGEXP = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  AUTH_ERROR_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  DUPLICATE_KEY_ERROR,
  INTERNAL_SERVER_ERROR,
  AUTH_MESSAGE,
  AUTH_MESSAGE_DATA,
  BAD_REQUEST_MESSAGE_DATA,
  BAD_REQUEST_MESSAGE_ID,
  DUPLICATE_MESSAGE_EMAIL,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_URL,
  ALLOWED_CORS,
  URL_REGEXP,
};
