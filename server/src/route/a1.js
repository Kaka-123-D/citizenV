const express = require('express');
const router = express.Router();
const a1Controller = require('../app/controller/A1Controller');

router.get('/', a1Controller.index);
router.post('/register', a1Controller.register);
router.post('/declare', a1Controller.declare);
router.get('/provinces', a1Controller.getProvinces);
router.post('/grantDeclare', a1Controller.grantDeclare);

module.exports = router;