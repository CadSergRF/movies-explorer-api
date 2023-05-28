const router = require('express').Router();

const { createUser } = require('../controllers/users.controller');
const { signupValidation } = require('../middlewares/celebrateValidation.middleware');

// Регистрация
router.post('/', signupValidation, createUser);

module.exports = router;
