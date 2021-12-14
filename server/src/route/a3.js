const express = require('express');
const router = express.Router();
const a3Controller = require('../app/controller/A3Controller');
const userMiddleware = require('../app/middleware/UserMiddleware');
const userController = require('../app/controller/UserController');

router.get("/", a3Controller.index);
router.post("/register", a3Controller.register);
router.post("/declare", a3Controller.declare);
router.get("/regions", a3Controller.getRegions);
router.get("/personAll", a3Controller.getPersonDistrictAll);
router.get("/personByWard", userController.getPersonByWard);
router.get("/personByPersonId", userController.getPersonByPersonId);
router.post("/person", userMiddleware.roleCUD, userController.addPerson);
router.put("/person", userMiddleware.roleCUD, userController.updatePerson);
router.delete("/person", userMiddleware.roleCUD, userController.deletePerson);

module.exports = router;