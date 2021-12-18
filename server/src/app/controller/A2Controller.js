const {Op} = require("sequelize");

const District = require('../model/District');
const User = require('../model/User');
const Province = require('../model/Province');
const Person = require('../model/Person');
const Permission = require('../model/Permission');

const siteController = require("./SiteController");

const {
  validationTextDes
} = require("../validation/ProvinceValidation");

const {
  validationDistrictId,
  validationDistrictName,
  validationDistrictType
} = require("../validation/DistrictValidation");

class A2Controller {
  index(req, res) {
    res.json({ title: "Hello A2" });
  }

  async declare(req, res) {
    const { id, name, type, textDes } = req.body;
    if (!(await validationDistrictId(id, "declare", req.session.username)))
      return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
    if (!(await validationDistrictName(name)))
      return res.json({ status: 0, error: "DISTRICT_NAME_ERROR!" });
    if (!validationDistrictType(type))
      return res.json({ status: 0, error: "DISTRICT_TYPE_ERROR!" });
    if (!validationTextDes(textDes))
      return res.json({ status: 0, error: "TEXT_DES_ERROR!" });
    try {
      const province = await Province.findOne({
        where: {
          provinceId: req.session.username,
        },
      });
      const district = await District.create({
        districtId: id,
        districtName: name,
        districtType: type,
        textDes,
      });
      await province.addDistrict(district);
      return res.json({ status: 1 });
    } catch {
      return res.json({ status: 0, error: "DECLARE_ERROR!" });
    }
  }

  async getRegions(req, res) {
    try {
      const districts = await District.findAll({
        where: {
          provinceId: req.session.username,
        },
        attributes: ["districtId", "districtName", "textDes"],
      });
      const result = [];
      for (const district of districts) {
        const user = await User.findOne({
          where: {
            username: district.districtId,
          },
        });
        var permission = null;
        if (user) {
          permission = await Permission.findOne({
            attributes: ["permissionId", "isComplete", "timeStart", "timeEnd"],
            where: {
              userId: user.userId,
            },
          });
        }
        result.push({
          id: district.districtId,
          name: district.districtName,
          type: district.districtType,
          textDes: district.textDes,
          permission
        });
      }
      res.json({ status: 1, regions: result });
    } catch (e) {
      res.json({ status: 0, error: "GET_REGIONS_ERROR!" });
    }
  }

  async register(req, res) {
    const { ids } = req.body;
    for (const id of ids) {
      if (!(await validationDistrictId(id, "register", req.session.username)))
        return res.json({ status: 0, error: "USERNAME_ERROR!" });
    }
    try {
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });
      for (const id of ids) {
        const districtUser = await siteController.register({
          username: id,
          password: id,
          role: "view",
          group: "a3",
        });
        if (!districtUser)
          return res.json({ status: 0, error: "REGISTER_ERROR!" });
        await user.addUser(districtUser);
      }
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "REGISTER_ERROR!" });
    }
  }

  //Lấy danh sách dân số toàn tỉnh
  async getPersonProvinceAll(req, res) {
    try {
      const province = await Province.findOne({
        where: {
          provinceId: req.session.username,
        },
      });
      const persons = await Person.findAll({
        where: {
          thuongTru: {
            [Op.like]: `%${province.provinceName}%`,
          },
        },
      });
      return res.json({ status: 1, persons });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_PROVINCE_ALL_ERROR!" });
    }
  }
}

module.exports = new A2Controller();
