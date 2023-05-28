const router = require('express').Router();

const { urlNotFound } = require('../contorllers/notFound.controller');

router.use('/*', urlNotFound);

module.exports = router;
