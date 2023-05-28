const router = require('express').Router();
const { logout } = require('../controllers/users.controller');

router.post('/', logout);

module.exports = router;
