const express = require('express');
const router = express.Router();
const a1Controller = require('../app/controller/A1Controller');
const userController = require('../app/controller/UserController');

router.get('/', a1Controller.index);
router.post('/register', a1Controller.register);
router.post('/declare', a1Controller.declare);
router.get('/regions', a1Controller.getRegions);
router.post('/grantDeclare', userController.grantDeclare);
router.get('/personAll', a1Controller.getPersonAll);
router.get('/personByProvince', a1Controller.getPersonByProvince);
router.get("/personByDistrict", userController.getPersonByDistrict);
router.get("/personByWard", userController.getPersonByWard);
router.get("/personByPersonId", userController.getPersonByPersonId);
router.post('/person', userController.addPerson);
router.put('/person', userController.updatePerson);
router.delete('/person', userController.deletePerson);

module.exports = router;