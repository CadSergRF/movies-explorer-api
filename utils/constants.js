const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const AUTH_ERROR_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const DUPLICATE_KEY_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

const ALLOWED_CORS = [
  'http://movies-csrf.nomoredomains.rocks',
  'https://movies-csrf.nomoredomains.rocks',
  'http://api.movies-csrf.nomoredomains.rocks',
  'https://api.movies-csrf.nomoredomains.rocks',
  'http://51.250.5.121',
  'https://51.250.5.121',
];

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  AUTH_ERROR_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  DUPLICATE_KEY_ERROR,
  INTERNAL_SERVER_ERROR,
  ALLOWED_CORS,
};
