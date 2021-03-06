const express = require('express');
const router = express.Router();
const b2Controller = require('../app/controller/B2Controller');
const userMiddleware = require("../app/middleware/UserMiddleware");
const userController = require("../app/controller/UserController");

router.get("/", b2Controller.index);

router.post("/personByPersonId", userController.getPersonByPersonId);

router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);
router.put("/confirmDeclareComplete", userMiddleware.roleCUD, userController.confirmDeclareComplete);
router.put("/cancelDeclareComplete", userMiddleware.roleCUD, userController.cancelDeclareComplete);

module.exports = router;