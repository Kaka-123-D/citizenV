const express = require('express');
const router = express.Router();
const b2Controller = require('../app/controller/B2Controller');

router.get('/home', b2Controller.index);

module.exports = router;