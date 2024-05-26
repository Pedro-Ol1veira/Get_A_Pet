const router = require('express').Router();
const petController = require('../controller/petController');

router.post('/create', petController.create);

module.exports = router;