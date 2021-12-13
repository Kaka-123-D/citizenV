const express = require('express');
const router = express.Router();
const a2Controller = require('../app/controller/A2Controller');
const userController = require("../app/controller/UserController");
const userMiddleware = require('../app/middleware/UserMiddleware');

router.get('/', a2Controller.index);
router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);

module.exports = router;