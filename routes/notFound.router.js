const router = require('express').Router();

const { urlNotFound } = require('../controllers/notFound.controller');

router.use('/*', urlNotFound);

module.exports = router;
