const express = require('express');
const router = express.Router();
const a2Controller = require('../app/controller/A2Controller');
const userController = require("../app/controller/UserController");
const userMiddleware = require('../app/middleware/UserMiddleware');
const chartMiddleware = require("../app/middleware/ChartMiddleware");

router.get('/', a2Controller.index);
router.post("/register", a2Controller.register);
router.post("/getNewPassword", userController.getNewPassword);
router.post("/declare", a2Controller.declare);

router.get("/regions", a2Controller.getRegions);
router.get("/personAll", a2Controller.getPersonProvinceAll);
router.post("/personByDistrict", userController.getPersonByDistrict);
router.post("/personByWard", userController.getPersonByWard);
router.post("/personByPersonId", userController.getPersonByPersonId);
router.post("/wards", userController.getWards);
router.post("/villages", userController.getVillages);

router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);
router.post("/grantDeclare", userMiddleware.roleCUD, userController.grantDeclare);
router.post("/cancelDeclare", userMiddleware.roleCUD, userController.cancelDeclare);
router.put("/confirmDeclareComplete", userMiddleware.roleCUD, userController.confirmDeclareComplete);
router.put("/cancelDeclareComplete", userMiddleware.roleCUD, userController.cancelDeclareComplete);

router.post("/percentAge", chartMiddleware.index, userController.getPercentAge);
router.post("/percentRegion", chartMiddleware.index, userController.getPercentRegion);
router.post("/percentGroupAge", chartMiddleware.index, userController.getPercentGroupAge);
router.post("/percentReligion", chartMiddleware.index, userController.getPercentReligion);
router.post("/percentEducation", chartMiddleware.index, userController.getPercentEducation);
router.post("/percentGender", chartMiddleware.index, userController.getPercentGender);
router.post("/percentUnemployment", chartMiddleware.index, userController.getPercentUnemployment);

module.exports = router;
