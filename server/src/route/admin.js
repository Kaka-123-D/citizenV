const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/AdminController');
const siteController = require('../app/controller/SiteController');

router.get('/', adminController.index);
router.post('/register', siteController.register);

module.exports = router;