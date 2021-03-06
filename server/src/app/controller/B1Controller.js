const Ward = require('../model/Ward');
const Village = require('../model/Village');
const User = require('../model/User');
const Person = require('../model/Person');
const Permission = require('../model/Permission');
const siteController = require('./SiteController');
const { Op } = require("sequelize");

const {
  validationVillageId,
  validationVillageName,
  validationVillageType
} = require('../validation/VillageValidation');

const {
  validationTextDes,
} = require('../validation/ProvinceValidation');

class B1Controller {
  index(req, res) {
    res.json({ title: "Hello B1" });
  }

  async declare(req, res) {
    const { id, name, type, textDes } = req.body;
    if (!await validationVillageId(id, "declare", req.session.username))
      return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
    if (!await validationVillageName(name, req.session.username))
      return res.json({ status: 0, error: "VILLAGE_NAME_ERROR!" });
    if (!validationVillageType(type))
      return res.json({ status: 0, error: "VILLAGE_TYPE_ERROR!" });
    if (!validationTextDes(textDes))
      return res.json({ status: 0, error: "TEXT_DES_ERROR!" });
    try {
      const ward = await Ward.findOne({
        where: {
          wardId: req.session.username,
        },
      });
      const village = await Village.create({
        villageId: id,
        villageName: name,
        villageType: type,
        textDes,
      });
      await ward.addVillage(village);
      return res.json({ status: 1 });
    } catch {
      return res.json({ status: 0, error: "DECLARE_ERROR!" });
    }
  }

  async getRegions(req, res) {
    try {
      const villages = await Village.findAll({
        where: {
          wardId: req.session.username,
        }
      });
      const result = [];
      for (const village of villages) {
        const user = await User.findOne({
          where: {
            username: village.villageId,
          },
        });
        var isRegistered = false;
        // Lấy số dân của thôn
        var amountPerson = await Person.getAmountPerson(await village.getAddress());
        var permission = null;
        if (user) {
          isRegistered = true;
          permission = await Permission.findOne({
            attributes: ["permissionId", "isComplete", "isFinish", "timeStart", "timeEnd"],
            where: {
              userId: user.userId,
            },
          });
        }
        result.push({
          id: village.villageId,
          name: village.villageName,
          type: village.villageType,
          textDes: village.textDes,
          permission,
          amountPerson,
          isRegistered
        });
      }
      res.json({ status: 1, regions: result });
    } catch (e) {
      res.json({ status: 0, error: "GET_REGIONS_ERROR!" });
    }
  }

  async register(req, res) {
    const { ids } = req.body;
    if (!ids) return res.json({ status: 0, error: "USERNAME_ERROR!" });
    for (const id of ids) {
      if (!await validationVillageId(id, "register", req.session.username))
        return res.json({ status: 0, error: "USERNAME_ERROR!" });
    }
    try {
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });
      for (const id of ids) {
        const data = await siteController.register({
          username: id,
          password: id,
          role: "view",
          group: "b2",
        });
        if (!data) {
          return res.json({ status: 0, error: "REGISTER_ERROR!" });
        } else {
          await user.addUser(data.user);
        }
      }
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "REGISTER_ERROR!" });
    }
  }

  //Lấy danh sách dân số toàn xã
  async getPersonWardAll(req, res) {
    try {
      const ward = await Ward.findOne({
        where: {
          wardId: req.session.username,
        },
      });
      const persons = await Person.findAll({
        where: {
          thuongTru: {
            [Op.like]: `%${await ward.getAddress()}%`,
          },
        },
      });
      return res.json({ status: 1, persons });
    } catch (e) {
      console.log(e);
      return res.json({ status: 0, error: "GET_PERSON_WARD_ALL_ERROR!" });
    }
  }

  //Lấy danh sách dân số theo từng thông/nhóm thôn
  async getPersonByVillage(req, res) {
    const { ids = [] } = req.body;
    try {
      const villageNames = [];
      var personsResult = [];
      for (const id of ids) {
        const data = await validationVillageId(
          id,
          "getPerson",
          req.session.username,
          req.session.group
        );
        if (data) {
          const village = data.village;
          villageNames.push(await village.getAddress());
        }
      }

      for (const villageName of villageNames) {
        const persons = await Person.findAll({
          where: {
            thuongTru: {
              [Op.like]: `%${villageName}%`,
            },
          },
        });
        personsResult = personsResult.concat(persons);
      }
      return res.json({ status: 1, persons: personsResult });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_BY_VILLAGE_ERROR!" });
    }
  }
}

module.exports = new B1Controller;