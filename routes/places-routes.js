const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/notice/main', placesControllers.getSubmitPage);

router.post('/notice/submit', placesControllers.overwriteNotice);

router.get('/notice/current', placesControllers.getNotice);

module.exports = router;
