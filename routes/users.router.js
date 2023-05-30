const router = require('express').Router();

const {
  getUser,
  changeUserInfo,
} = require('../controllers/users.controller');
const { userInfoValidation } = require('../middlewares/celebrateValidation.middleware');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', userInfoValidation, changeUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = router;
