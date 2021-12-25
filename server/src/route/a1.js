const express = require('express');
const router = express.Router();
const a1Controller = require('../app/controller/A1Controller');
const userController = require('../app/controller/UserController');
const chartMiddleware = require('../app/middleware/ChartMiddleware');

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

router.post("/percentAge", chartMiddleware.index, userController.getPercentAge);
router.post("/percentRegion", chartMiddleware.index, userController.getPercentRegion);
router.post("/percentMigrate", chartMiddleware.index, userController.getPercentMigrate);
router.post("/percentGroupAge", chartMiddleware.index, userController.getPercentGroupAge);
router.post("/percentReligion", chartMiddleware.index, userController.getPercentReligion);
router.post("/percentEducation", chartMiddleware.index, userController.getPercentEducation);
router.post("/percentGender", chartMiddleware.index, userController.getPercentGender);
router.post("/percentUnemployment",chartMiddleware.index, userController.getPercentUnemployment);

module.exports = router;