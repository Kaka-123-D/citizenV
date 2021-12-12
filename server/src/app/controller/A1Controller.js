const schedule = require("node-schedule");

const User = require("../model/User");
const Province = require("../model/Province");
const Permission = require("../model/Permission");
const siteController = require("./SiteController");

const {
  validationProvinceId,
  validationProvinceName,
  validationTextDes,
  validationTimeStart,
  validationHowLong,
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

  async grantDeclare(req, res) {
    const {
      id,
      yearStart,
      monthStart,
      dayStart,
      hourStart,
      minuteStart,
      howLong,
    } = req.body;
    //
    if (!(await validationProvinceId(id, "grantDeclare"))) {
      return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
    }
    if (
      !validationTimeStart(
        yearStart,
        monthStart,
        dayStart,
        hourStart,
        minuteStart
      )
    ) {
      return res.json({ status: 0, error: "TIME_START_ERROR!" });
    }
    if (!validationHowLong(howLong)) {
      return res.json({ status: 0, error: "HOW_LONG_TIME_ERROR!" });
    }
    //
    const timeStart = new Date(
      yearStart,
      monthStart - 1,
      dayStart,
      hourStart,
      minuteStart
    );
    const timeEnd = new Date(
      yearStart,
      monthStart - 1,
      dayStart,
      hourStart,
      minuteStart
    );
    timeEnd.setTime(timeEnd.getTime() + howLong * 60 * 1000);
    try {
      //
      const user = await User.findOne({ where: { username: id } });
      const permission = await Permission.create({ timeStart, timeEnd });
      await user.setPermission(permission);
      //
      schedule.scheduleJob(timeStart, async () => {
        console.log("GRANT_DECLARE_START!");
        await User.update(
          { role: "edit" },
          {
            where: {
              username: id,
            },
          }
        );
      });
      schedule.scheduleJob(timeEnd, async () => {
        console.log("GRANT_DECLARE_END!");
        await User.update(
          { role: "view" },
          {
            where: {
              username: id,
            },
          }
        );
      });
      //
      res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "GRANT_DECLARE_ERROR!" });
    }
  }

  async getRegions(req, res) {
    try {
      const provinces = await Province.findAll({
        attributes: ["provinceId", "provinceName", "textDes"],
      });
      res.json({ status: 1, regions: provinces });
    } catch (e) {
      res.json({ status: 0, error: "GET_REGIONS_ERROR!"})
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
}

module.exports = new A1Controller();
