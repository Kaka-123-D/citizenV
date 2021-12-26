const Province = require('../model/Province');
const District = require('../model/District');
const Ward = require('../model/Ward');
const Village = require('../model/Village');
const Person = require('../model/Person')

class ChartMiddleware {
  async index(req, res, next) {
    const { ids, tag } = req.body;
    var address = "";
    if (req.session.group == "a1") {
      if (ids && Array.isArray(ids) && ids.length > 0 && tag) {
        var arr = [];
        if (tag == "province") {
          for (const id of ids) {
            const province = await Province.findOne({
              where: {
                provinceId: id,
              },
            });
            if (province) {
              arr.push(province.getAddress());
            }
          }
          address = arr.join("|");
        } else if (tag == "district") {
          for (const id of ids) {
            const district = await District.findOne({
              where: {
                districtId: id,
              },
            });
            if (district) {
              arr.push(await district.getAddress());
            }
          }
          address = arr.join("|");
        } else if (tag == "ward") {
          for (const id of ids) {
            const ward = await Ward.findOne({
              where: {
                wardId: id,
              },
            });
            if (ward) {
              arr.push(await ward.getAddress());
            }
          }
          address = arr.join("|");
        }
      } else {
        address = "nationwide";
      }
    }
    if (req.session.group == "a2") {
      const province = await Province.findOne({
        where: {
          provinceId: req.session.username,
        },
      });
      if (ids && Array.isArray(ids) && ids.length > 0 && tag) {
        var arr = [];
        if (tag == "district") {
          for (const id of ids) {
            const district = await District.findOne({
              where: {
                districtId: id,
                provinceId: province.provinceId,
              },
            });
            if (district) {
              arr.push(await district.getAddress());
            }
          }
          address = arr.join("|");
        } else if (tag == "ward") {
          for (const id of ids) {
            const ward = await Ward.findOne({
              where: {
                wardId: id,
              },
            });
            if (ward) {
              arr.push(await ward.getAddress());
            }
          }
          address = arr.join("|");
        }
      } else {
        address = province.getAddress();
      }
    }
    if (req.session.group == "a3") {
      const district = await District.findOne({
        where: {
          districtId: req.session.username,
        },
      });
      if (ids && Array.isArray(ids) && ids.length > 0 && tag) {
        var arr = [];
        if (tag == "ward") {
          for (const id of ids) {
            const ward = await Ward.findOne({
              where: {
                wardId: id,
                districtId: district.districtId,
              },
            });
            if (ward) {
              arr.push(await ward.getAddress());
            }
          }
          address = arr.join("|");
        }
      } else {
        address = await district.getAddress();
      }
    }
    if (req.session.group == "b1") {
      const ward = await Ward.findOne({
        where: {
          wardId: req.session.username,
        },
      });
      if (ids && Array.isArray(ids) && ids.length > 0 && tag) {
        var arr = [];
        if (tag == "village") {
          for (const id of ids) {
            const village = await Village.findOne({
              where: {
                villageId: id,
                wardId: ward.wardId,
              },
            });
            if (village) {
              arr.push(await village.getAddress());
            }
          }
          address = arr.join("|");
        }
      } else {
        address = await ward.getAddress();
      }
    }
    if (address == "") {
      return res.json({ status: 0, error: "IDS_OR_TAG_ERROR!" });
    }
    const temp = Math.random();
    console.time(`amountPersonTime${temp}`);
    const amountPerson = await Person.getAmountPerson(address);
    console.timeEnd(`amountPersonTime${temp}`);
    if (amountPerson == 0) {
      return res.json({ status: 0, error: "AMOUNT_PERSON_ZERO!" });
    }
    req.address = address;
    req.amountPerson = amountPerson;
    next();
  }
}

module.exports = new ChartMiddleware();
