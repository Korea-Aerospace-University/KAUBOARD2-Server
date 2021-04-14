const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/', placesControllers.getSubmitPage);

router.post('/write-notice', placesControllers.overwriteNotice);

router.get('/current-notice', placesControllers.getNotice);

module.exports = router;
