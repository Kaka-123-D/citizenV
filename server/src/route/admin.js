const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/AdminController');

router.get('/', adminController.index);
router.post('/register', adminController.register);

module.exports = router;