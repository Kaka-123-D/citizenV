const District = require('../model/District');
const Ward = require('../model/Ward');
const User = require('../model/User');
const Person = require('../model/Person');
const Permission = require('../model/Permission')

const siteController = require('./SiteController');

const {
  validationTextDes,
} = require('../validation/ProvinceValidation');

const {
  validationWardId,
  validationWardName,
  validationWardType,
} = require('../validation/WardValidation');

class A3Controller {
  index(req, res) {
    res.json({ title: "Hello A3" });
  }

  async declare(req, res) {
    const { id, name, type, textDes } = req.body;
    if (!await validationWardId(id, "declare", req.session.username))
      return res.json({ status: 0, error: "WARD_ID_ERROR!" });
    if (!await validationWardName(name))
      return res.json({ status: 0, error: "WARD_NAME_ERROR!" });
    if (!validationWardType(type))
      return res.json({ status: 0, error: "WARD_TYPE_ERROR!" });
    if (!validationTextDes(textDes))
      return res.json({ status: 0, error: "TEXT_DES_ERROR!" });
    try {
      const district = await District.findOne({
        where: {
          districtId: req.session.username,
        },
      });
      const ward = await Ward.create({
        wardId: id,
        wardName: name,
        wardType: type,
        textDes,
      });
      await district.addWard(ward);
      return res.json({ status: 1 });
    } catch {
      return res.json({ status: 0, error: "DECLARE_ERROR!" });
    }
  }

  async getRegions(req, res) {
    try {
      const wards = await Ward.findAll({
        where: {
          districtId: req.session.username,
        },
        attributes: ["wardId", "wardName", "textDes"],
      });
      const result = [];
      for (const ward of wards) {
        const user = await User.findOne({
          where: {
            username: ward.wardId,
          },
        });
        //Lấy sô dân của xã
        var amountPerson = await Person.getAmountPerson(ward.getAddress());
        var permission = null;
        if (user) {
          permission = await Permission.findOne({
            attributes: ["permissionId", "isComplete", "isFinish", "timeStart", "timeEnd"],
            where: {
              userId: user.userId,
            },
          });
        }

        result.push({
          id: ward.wardId,
          name: ward.wardName,
          type: ward.wardType,
          textDes: ward.textDes,
          permission,
          amountPerson
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
      if (!await validationWardId(id, "register", req.session.username))
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
          group: "b1",
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

  //Lấy danh sách dân số toàn huyện
  async getPersonDistrictAll(req, res) {
    try {
      const district = await District.findOne({
        where: {
          districtId: req.session.username,
        },
      });
      const persons = await Person.findAll({
        where: {
          thuongTru: {
            [Op.like]: `%${district.getAddress()}%`,
          },
        },
      });
      return res.json({ status: 1, persons });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_DISTRICT_ALL_ERROR!" });
    }
  }
}

module.exports = new A3Controller;