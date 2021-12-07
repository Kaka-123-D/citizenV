const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');

router.post('/login', siteController.login);
router.post('/logout', siteController.logout);

module.exports = router;