const express = require('express');
const router = express.Router();
const a1Controller = require('../app/controller/A1Controller');
const userController = require('../app/controller/UserController');

router.get('/', a1Controller.index);
router.post('/register', a1Controller.register);
router.post('/getNewPassword', userController.getNewPassword);
router.post('/declare', a1Controller.declare);
router.get('/regions', a1Controller.getRegions);
router.post("/districts", userController.getDistricts);
router.post("/wards", userController.getWards);
router.post("/villages", userController.getVillages);

router.get('/personAll', a1Controller.getPersonAll);
router.post('/personByProvince', a1Controller.getPersonByProvince);
router.post("/personByDistrict", userController.getPersonByDistrict);
router.post("/personByWard", userController.getPersonByWard);
router.post("/personByPersonId", userController.getPersonByPersonId);

router.post("/grantDeclare", userController.grantDeclare);
router.post("/cancelDeclare", userController.cancelDeclare);
router.post('/person', userController.addPerson);
router.put('/person', userController.updatePerson);
router.delete('/person', userController.deletePerson);
router.post("/percentAge", userController.getPercentAge);
router.post("/percentRegion", userController.getPercentRegion);
router.post("/percentMigrate", userController.getPercentMigrate);
router.post("/percentGroupAge", userController.getPercentGroupAge);
router.post("/percentReligion", userController.getPercentReligion);
router.post("/percentEducation", userController.getPercentEducation);
router.post("/percentGender", userController.getPercentGender);
router.post("/percentUnemployment", userController.getPercentUnemployment);

module.exports = router;