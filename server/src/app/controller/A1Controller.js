const { Op } = require("sequelize");

const Province = require("../model/Province");
const Person = require("../model/Person");
const Permission = require("../model/Permission");
const User = require("../model/User");
const siteController = require("./SiteController");

const {
  validationProvinceId,
  validationProvinceName,
  validationProvinceType,
  validationTextDes,
} = require("../validation/ProvinceValidation");

class A1Controller {
  index(req, res) {
    res.json({ title: "Hello A1" });
  }

  async declare(req, res) {
    const { id, name, type, textDes } = req.body;
    if (!await validationProvinceId(id, "declare"))
      return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
    if (!await validationProvinceName(name))
      return res.json({ status: 0, error: "PROVINCE_NAME_ERROR!" });
    if (!validationProvinceType(type))
      return res.json({ status: 0, error: "PROVINCE_TYPE_ERROR!" });
    if (!validationTextDes(textDes))
      return res.json({ status: 0, error: "TEXT_DES_ERROR!" });
    try {
      await Province.create({ provinceId: id, provinceName: name, provinceType: type, textDes });
      return res.json({ status: 1 });
    } catch {
      return res.json({ status: 0, error: "DECLARE_ERROR!" });
    }
  }

  async getRegions(req, res) {
    try {
      const provinces = await Province.findAll({
        attributes: ["provinceId", "provinceName", "textDes"],
      });
      const result = [];
      for (const province of provinces) {
        const user = await User.findOne({
          where: {
            username: province.provinceId,
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
        var progress = -1;
        const districtUsers = await user.getUsers();
        const ms = districtUsers.length;
        var ts = 0;

        if (ms > 0) {
          for (const user of districtUsers) {
            const permission = await Permission.findOne({
              attributes: ["permissionId", "isComplete", "timeStart", "timeEnd"],
              where: {
                userId: user.userId,
              }
            });
            if (permission) {
              if (permission.isComplete) {
                ts++;
              }
            }
          }
          if (ts > 0) {
            progress = ts / ms;
          }
        }

        result.push({
          id: province.provinceId,
          name: province.provinceName,
          type: province.provinceType,
          textDes: province.textDes,
          permission, 
          progress
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
      if (!await validationProvinceId(id, "register"))
        return res.json({ status: 0, error: "USERNAME_ERROR!" });
    }
    for (const id of ids) {
      if (!await siteController.register({
        username: id,
        password: id,
        role: "view",
        group: "a2",
      })) {
        return res.json({ status: 0, error: "REGISTER_ERROR!" });
      }
    }
    return res.json({ status: 1 });
  }

  //Lấy danh sách dân số toàn quốc
  async getPersonAll(req, res) {
    try {
      const persons = await Person.findAll();
      return res.json({ status: 1, persons });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_ALL_ERROR!" });
    }
  }

  //Lấy danh sách dân số theo tỉnh/nhóm tỉnh
  async getPersonByProvince(req, res) {
    const { ids = [] } = req.body;
    try {
      const provinceNames = [];
      var personsResult = [];
      for (const id of ids) {
        const data = await validationProvinceId(id, "getPerson");
        if (data) {
          const province = data.province;
          provinceNames.push(province.provinceName);
        }
      }

      for (const provinceName of provinceNames) {
        const persons = await Person.findAll({
          where: {
            thuongTru: {
              [Op.like]: `%${provinceName}%`,
            },
          },
        });
        personsResult = personsResult.concat(persons);
      }
      return res.json({ status: 1, persons: personsResult });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_BY_PROVINCE_ERROR!" });
    }
  }
}

module.exports = new A1Controller();
