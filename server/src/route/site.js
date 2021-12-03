const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');

router.post('/refreshToken', siteController.refresh);
router.post('/login', siteController.login);
router.post('/logout', siteController.logout);

module.exports = router;