const express = require('express');
const router = express.Router();
const b1Controller = require('../app/controller/B1Controller');
const userMiddleware = require('../app/middleware/UserMiddleware');
const userController = require('../app/controller/UserController');

router.get("/", b1Controller.index);
router.post("/register", b1Controller.register);
router.post("/getNewPassword", userController.getNewPassword);
router.post("/declare", b1Controller.declare);

router.get("/regions", b1Controller.getRegions);
router.get("/personAll", b1Controller.getPersonWardAll);
router.get("/personByVillage", b1Controller.getPersonByVillage);
router.get("/personByPersonId", userController.getPersonByPersonId);

router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);
router.post("/grantDeclare", userMiddleware.roleCUD, userController.grantDeclare);
router.post("/cancelDeclare", userMiddleware.roleCUD, userController.cancelDeclare);
router.put("/confirmDeclareComplete", userMiddleware.roleCUD, userController.confirmDeclareComplete);
router.put("/cancelDeclareComplete", userMiddleware.roleCUD, userController.cancelDeclareComplete);

module.exports = router;