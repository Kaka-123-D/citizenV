const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');
const loginMiddleware = require('../app/middleware/LoginMiddleware');
const homeMiddleware = require('../app/middleware/HomeMiddleware');

router.post('/login', homeMiddleware.index, siteController.login);
router.post('/logout', loginMiddleware.index, siteController.logout);
router.get('/*', siteController.home);

module.exports = router;