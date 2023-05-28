const router = require('express').Router();
// const { signinValidation } = require('../middlewares/celebrateValidation');
const { login } = require('../controllers/users.controller');

// Авторизация
router.post('/', login);

module.exports = router;
