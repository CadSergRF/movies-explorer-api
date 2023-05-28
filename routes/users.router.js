const router = require('express').Router();

const {
  getUser,
  changeUserInfo,
} = require('../controllers/users.controller');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', changeUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = router;
