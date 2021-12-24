const express = require('express');
const router = express.Router();
const a2Controller = require('../app/controller/A2Controller');
const userController = require("../app/controller/UserController");
const userMiddleware = require('../app/middleware/UserMiddleware');

router.get('/', a2Controller.index);
router.post("/register", a2Controller.register);
router.post("/getNewPassword", userController.getNewPassword);
router.post("/declare", a2Controller.declare);

router.get("/regions", a2Controller.getRegions);
router.get("/personAll", a2Controller.getPersonProvinceAll);
router.get("/personByDistrict", userController.getPersonByDistrict);
router.get("/personByWard", userController.getPersonByWard);
router.get("/personByPersonId", userController.getPersonByPersonId);

router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);
router.post("/grantDeclare", userMiddleware.roleCUD, userController.grantDeclare);
router.post("/cancelDeclare", userMiddleware.roleCUD, userController.cancelDeclare);
router.put("/confirmDeclareComplete", userMiddleware.roleCUD, userController.confirmDeclareComplete);
router.put("/cancelDeclareComplete", userMiddleware.roleCUD, userController.cancelDeclareComplete);
router.get("/percentAge", userController.getPercentAge);
router.get("/percentRegion", userController.getPercentRegion);
router.get("/percentGroupAge", userController.getPercentGroupAge);
router.get("/percentReligion", userController.getPercentReligion);
router.get("/percentEducation", userController.getPercentEducation);
router.get("/percentGender", userController.getPercentGender);
router.get("/percentUnemployment", userController.getPercentUnemployment);

module.exports = router;
