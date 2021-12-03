const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/AdminController');
const userMiddleware = require('../app/middleware/UserMiddleware');
const siteController = require('../app/controller/SiteController');

router.get('/', userMiddleware.index, adminController.index);
router.post('/login', siteController.login);
router.post('/logout', userMiddleware.index, siteController.logout);
router.post('/register', userMiddleware.index, siteController.register);
router.post('/refreshToken',userMiddleware.index, siteController.refresh);

module.exports = router;