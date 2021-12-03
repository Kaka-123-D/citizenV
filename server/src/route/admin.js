const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/AdminController');
const loginMiddleware = require('../app/middleware/LoginMiddleware');
const siteController = require('../app/controller/SiteController');

router.get('/', loginMiddleware.index, adminController.index);
router.post('/login', siteController.login);
router.post('/logout', loginMiddleware.index, siteController.logout);
router.post('/register', loginMiddleware.index, siteController.register);
router.post('/refreshToken',loginMiddleware.index, siteController.refresh);

module.exports = router;