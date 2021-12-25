const express = require('express');
const router = express.Router();
const a3Controller = require('../app/controller/A3Controller');
const userMiddleware = require('../app/middleware/UserMiddleware');
const userController = require('../app/controller/UserController');
const chartMiddleware = require("../app/middleware/ChartMiddleware");

router.get("/", a3Controller.index);
router.post("/register", a3Controller.register);
router.post("/getNewPassword", userController.getNewPassword);
router.post("/declare", a3Controller.declare);

router.get("/regions", a3Controller.getRegions);
router.get("/personAll", a3Controller.getPersonDistrictAll);
router.post("/personByWard", userController.getPersonByWard);
router.post("/personByPersonId", userController.getPersonByPersonId);
router.post("/villages", userController.getVillages);

router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);
router.post("/grantDeclare", userMiddleware.roleCUD, userController.grantDeclare);
router.post("/cancelDeclare", userMiddleware.roleCUD, userController.cancelDeclare);
router.put("/confirmDeclareComplete", userMiddleware.roleCUD, userController.confirmDeclareComplete);
router.put("/cancelDeclareComplete", userMiddleware.roleCUD, userController.cancelDeclareComplete);

router.post("/percentAge", chartMiddleware.index, userController.getPercentAge);
router.post("/percentGroupAge", chartMiddleware.index, userController.getPercentGroupAge);
router.post("/percentReligion", chartMiddleware.index, userController.getPercentReligion);
router.post("/percentGender", chartMiddleware.index, userController.getPercentGender);
router.post("/percentUnemployment", chartMiddleware.index, userController.getPercentUnemployment);

module.exports = router;