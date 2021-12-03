const express = require('express');
const router = express.Router();
const a2Controller = require('../app/controller/A2Controller');

router.get('/home', a2Controller.index);

module.exports = router;