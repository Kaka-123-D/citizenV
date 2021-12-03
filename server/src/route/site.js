const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');
const loginMiddleware = require('../app/middleware/LoginMiddleware');
const userMiddleware = require('../app/middleware/UserMiddleware');

router.post('/api/refreshToken', siteController.refresh);
router.post('/api/login', siteController.login);
router.post('/api/logout', siteController.logout);
router.get('/api/home', loginMiddleware.index, userMiddleware.index);
router.post('/api/register', loginMiddleware.index, userMiddleware.index);
router.post('/api/declare', loginMiddleware.index, userMiddleware.index);
router.get('/api/provinces', loginMiddleware.index, userMiddleware.index);
router.post('/api/grantDeclare', loginMiddleware.index, userMiddleware.index);
router.get('/test', siteController.test);

module.exports = router;