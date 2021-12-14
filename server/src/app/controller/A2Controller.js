const {Op} = require("sequelize");

const District = require('../model/District');
const User = require('../model/User');
const Province = require('../model/Province');
const Person = require('../model/Person');

const siteController = require("./SiteController");

const {
  validationTextDes
} = require("../validation/ProvinceValidation");

const {
  validationDistrictId,
  validationDistrictName
} = require("../validation/DistrictValidation");

class A2Controller {
  index(req, res) {
    res.json({ title: "Hello A2" });
  }

  async declare(req, res) {
    const { id, name, textDes } = req.body;
    if (!(await validationDistrictId(id, "declare", req.session.username)))
      return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
    if (!(await validationDistrictName(name)))
      return res.json({ status: 0, error: "DISTRICT_NAME_ERROR!" });
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
      const result = districts.map((district) => {
        const regex =
          /^(quận |huyện |thành phố )([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$)/g;
        const districtNames = regex.exec(district.districtName);
        return {
          id: district.districtId,
          name: districtNames[2],
          textDes: district.textDes,
        };
      });
      res.json({ status: 1, regions: result });
    } catch (e) {
      res.json({ status: 0, error: "GET_REGIONS_ERROR!" });
    }
  }

  async register(req, res) {
    const { id } = req.body;
    if (!(await validationDistrictId(id, "register", req.session.username)))
      return res.json({ status: 0, error: "USERNAME_ERROR!" });
    const districtUser = await siteController.register({
      username: id,
      password: id,
      role: "view",
      group: "a3",
    });
    try {
      if (!districtUser)
        return res.json({ status: 0, error: "REGISTER_ERROR!" });
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });
      await user.addUser(districtUser);
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
