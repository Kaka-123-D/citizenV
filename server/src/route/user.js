const express = require('express');
const router = express.Router();
const loginMiddleware = require('../app/middleware/LoginMiddleware');
const userMiddleware = require('../app/middleware/UserMiddleware');

router.get('/', loginMiddleware.index, userMiddleware.index);
router.post('/register', loginMiddleware.index, userMiddleware.index);
router.post('/declare', loginMiddleware.index, userMiddleware.index);
router.get('/provinces', loginMiddleware.index, userMiddleware.index);
router.post('/grantDeclare', loginMiddleware.index, userMiddleware.index);

module.exports = router;
