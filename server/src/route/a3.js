const express = require('express');
const router = express.Router();
const a3Controller = require('../app/controller/A3Controller');

router.get('/home', a3Controller.index);

module.exports = router;