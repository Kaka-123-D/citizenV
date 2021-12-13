const { Op } = require("sequelize");

const Province = require("../model/Province");
const Person = require("../model/Person");
const siteController = require("./SiteController");

const {
  validationProvinceId,
  validationProvinceName,
  validationTextDes,
} = require("../validation/ProvinceValidation");

class A1Controller {
  index(req, res) {
    res.json({ title: "Hello A1" });
  }

  async declare(req, res) {
    const { id, name, textDes } = req.body;
    if (!(await validationProvinceId(id, "declare")))
      return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
    if (!(await validationProvinceName(name)))
      return res.json({ status: 0, error: "PROVINCE_NAME_ERROR!" });
    if (!validationTextDes(textDes))
      return res.json({ status: 0, error: "TEXT_DES_ERROR!" });
    try {
      await Province.create({ provinceId: id, provinceName: name, textDes });
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
      const result = provinces.map((province) => {
        const regex =
          /^(tỉnh |thành phố )([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$)/g;
        const provinceNames = regex.exec(province.provinceName);
        return {provinceId: province.provinceId, provinceName: provinceNames[2], textDes: province.textDes}
      })
      res.json({ status: 1, regions: result });
    } catch (e) {
      console.log(e);
      res.json({ status: 0, error: "GET_REGIONS_ERROR!" });
    }
  }

  async register(req, res) {
    const { id } = req.body;
    if (!(await validationProvinceId(id, "register")))
      return res.json({ status: 0, error: "USERNAME_ERROR!" });
    if (
      !(await siteController.register({
        username: id,
        password: id,
        role: "view",
        group: "a2",
      }))
    ) {
      return res.json({ status: 0, error: "REGISTER_ERROR!" });
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
    const { provinceIds = [] } = req.body;
    try {
      const provinceNames = [];
      var personsResult = [];
      for (const provinceId of provinceIds) {
        if (await validationProvinceId(provinceId, "ac")) {
          const province = await Province.findOne({
            where: { provinceId: provinceId },
          });
          provinceNames.push(province.provinceName);
        }
      }

      for (const provinceName of provinceNames) {
        const persons = await Person.findAll({
          where: {
            thuongTru: {
              [Op.like]: `%tỉnh ${provinceName}%`,
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
