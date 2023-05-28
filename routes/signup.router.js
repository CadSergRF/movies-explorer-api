const router = require('express').Router();
const { createUser } = require('../controllers/users.controller');

// Регистрация
router.post('/', createUser);

module.exports = router;
