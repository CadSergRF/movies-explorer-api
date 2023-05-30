const router = require('express').Router();

const { signinValidation } = require('../middlewares/celebrateValidation.middleware');
const { login } = require('../controllers/users.controller');

// Авторизация
router.post('/', signinValidation, login);

module.exports = router;
