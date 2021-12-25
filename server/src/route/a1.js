const express = require('express');
const router = express.Router();
const a1Controller = require('../app/controller/A1Controller');
const userController = require('../app/controller/UserController');

router.get('/', a1Controller.index);
router.post('/register', a1Controller.register);
router.post('/getNewPassword', userController.getNewPassword);
router.post('/declare', a1Controller.declare);
router.get('/regions', a1Controller.getRegions);
router.get("/districts", userController.getDistricts);
router.get("/wards", userController.getWards);
router.get("/villages", userController.getVillages);

router.get('/personAll', a1Controller.getPersonAll);
router.get('/personByProvince', a1Controller.getPersonByProvince);
router.get("/personByDistrict", userController.getPersonByDistrict);
router.get("/personByWard", userController.getPersonByWard);
router.get("/personByPersonId", userController.getPersonByPersonId);

router.post("/grantDeclare", userController.grantDeclare);
router.post("/cancelDeclare", userController.cancelDeclare);
router.post('/person', userController.addPerson);
router.put('/person', userController.updatePerson);
router.delete('/person', userController.deletePerson);
router.get("/percentAge", userController.getPercentAge);
router.get("/percentRegion", userController.getPercentRegion);
router.get("/percentMigrate", userController.getPercentMigrate);
router.get("/percentGroupAge", userController.getPercentGroupAge);
router.get("/percentReligion", userController.getPercentReligion);
router.get("/percentEducation", userController.getPercentEducation);
router.get("/percentGender", userController.getPercentGender);
router.get("/percentUnemployment", userController.getPercentUnemployment);

module.exports = router;