const express = require('express');
const router = express.Router();
const b1Controller = require('../app/controller/B1Controller');

router.get('/home', b1Controller.index);

module.exports = router;