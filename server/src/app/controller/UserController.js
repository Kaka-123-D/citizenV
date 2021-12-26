const schedule = require("node-schedule");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { Op } = require("sequelize");

dotenv.config();

const User = require("../model/User");
const Permission = require("../model/Permission");
const Person = require("../model/Person");
const Province = require("../model/Province");
const District = require("../model/District");
const Ward = require("../model/Ward");
const Village = require("../model/Village");

const { SALT_ROUND } = process.env;

const { validationDistrictId } = require("../validation/DistrictValidation");
const { validationWardId } = require("../validation/WardValidation");
const { validationVillageId } = require("../validation/VillageValidation");
const { UpdateRoleAll } = require("../logic/UpdateRoleAll");
const { validationFullName } = require("../validation/UserValidation");
const {
  validationProvinceId,
  validationTime,
} = require("../validation/ProvinceValidation");
const {
  validationStt,
  validationPersonId,
  validationBirthday,
  validationSex,
  validationAddress,
  validationReligion,
  validationEducationLevel,
  validationJob,
} = require("../validation/PersonValidation");

class UserController {
  //Cấp quyền khai báo
  async grantDeclare(req, res) {
    const { ids = [], timeStart, timeEnd } = req.body;
    const users = [];
    //
    if (!validationTime(timeStart, timeEnd)) {
      return res.json({ status: 0, error: "TIME_ERROR!" });
    }
    const timeStartD = new Date(timeStart);
    const timeEndD = new Date(timeEnd);
    //
    if (req.session.group == "a1") {
      for (const id of ids) {
        const data = await validationProvinceId(id, "grantDeclare");
        if (!data) {
          return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
    }
    if (req.session.group == "a2") {
      for (const id of ids) {
        //có thể là object or false
        const data = await validationDistrictId(
          id,
          "grantDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
      const permission = await Permission.findOne({
        where: {
          userId: req.session.userId,
        },
      });
      if (timeEndD > permission.timeEnd) {
        return res.json({ status: 0, error: "TIME_ERROR!" });
      }
    }
    if (req.session.group == "a3") {
      for (const id of ids) {
        const data = await validationWardId(
          id,
          "grantDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "WARD_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
      const permission = await Permission.findOne({
        where: {
          userId: req.session.userId,
        },
      });
      if (timeEnd > permission.timeEnd) {
        return res.json({ status: 0, error: "TIME_ERROR!" });
      }
    }
    if (req.session.group == "b1") {
      for (const id of ids) {
        const data = await validationVillageId(
          id,
          "grantDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
      const permission = await Permission.findOne({
        where: {
          userId: req.session.userId,
        },
      });
      if (timeEnd > permission.timeEnd) {
        return res.json({ status: 0, error: "TIME_ERROR!" });
      }
    }
    //
    try {
      var permissions = [];
      for (const i in ids) {
        const user = users[i];
        const id = ids[i];
        const permission = await Permission.create({
          timeStart: timeStartD,
          timeEnd: timeEndD,
          isFinish: false,
          isComplete: false,
        });
        await user.addPermission(permission);
        permissions.push({ id, permission });
        //
        schedule.scheduleJob(`start_${id}`, timeStartD, async function () {
          console.log(`GRANT_DECLARE_START! - id:${id}`);
          await User.update(
            { role: "edit" },
            {
              where: {
                username: id,
              },
            }
          );
        });
        schedule.scheduleJob(`end_${id}`, timeEndD, async function () {
          await UpdateRoleAll(id, "expired");
        });
      }
      //
      res.json({ status: 1, permissions });
    } catch (e) {
      return res.json({ status: 0, error: "GRANT_DECLARE_ERROR!" });
    }
  }

  //Hủy quyền khai báo
  async cancelDeclare(req, res) {
    const { ids } = req.body;
    const users = [];

    if (req.session.group == "a1") {
      for (const id of ids) {
        const data = await validationProvinceId(id, "cancelDeclare");
        if (!data) {
          return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
    }
    if (req.session.group == "a2") {
      for (const id of ids) {
        const data = await validationDistrictId(
          id,
          "cancelDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
    }
    if (req.session.group == "a3") {
      for (const id of ids) {
        const data = await validationWardId(
          id,
          "cancelDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "WARD_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
    }
    if (req.session.group == "b1") {
      for (const id of ids) {
        const data = await validationVillageId(
          id,
          "cancelDeclare",
          req.session.username,
          req.session.group
        );
        if (!data) {
          return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
        } else {
          users.push(data.user);
        }
      }
    }
    try {
      for (const i in ids) {
        const jobNames = _.keys(schedule.scheduledJobs);
        const id = ids[i];
        for (const name of jobNames) {
          if (name == `start_${id}`) {
            schedule.cancelJob(name);
          }
          if (name == `end_${id}`) {
            await UpdateRoleAll(id, "cancel");
          }
        }
      }
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "CANCEL_DECLARE_ERROR!" });
    }
  }

  //Xác nhận khai bao hoan thanh
  async confirmDeclareComplete(req, res) {
    try {
      await Permission.update(
        { isComplete: true },
        {
          where: {
            isFinish: false,
            userId: req.session.userId,
          },
        }
      );
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "CONFIRM_DECLARE_COMPLETE_ERROR!" });
    }
  }

  //Huy khai bao hoan thanh
  async cancelDeclareComplete(req, res) {
    try {
      await Permission.update(
        { isComplete: false },
        {
          where: {
            isFinish: false,
            userId: req.session.userId,
          },
        }
      );
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "CANCEL_DECLARE_COMPLETE_ERROR!" });
    }
  }

  async getPersonByPersonId(req, res) {
    const { personId } = req.body;
    var person = null;
    const data = await validationPersonId(
      personId,
      "getPerson",
      req.session.username,
      req.session.group
    );
    if (!data) {
      return res.json({ status: 0, error: "PERSON_ID_ERROR!" });
    } else {
      person = data.person;
    }
    return res.json({ status: 1, person });
  }

  async addPerson(req, res) {
    const {
      personId,
      fullName,
      birthday,
      sex,
      village,
      thuongTru,
      tamTru,
      religion,
      educationLevel,
      job,
    } = req.body;
    if (!(await validationPersonId(personId, "add")))
      return res.json({ status: 0, error: "PERSON_ID_ERROR!" });
    if (!validationFullName(fullName))
      return res.json({ status: 0, error: "FULL_NAME_ERROR!" });
    if (!validationBirthday(birthday))
      return res.json({ status: 0, error: "BIRTHDAY_ERROR!" });
    if (!validationSex(sex))
      return res.json({ status: 0, error: "SEX_ERROR!" });
    if (!validationAddress(village))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationAddress(thuongTru))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationAddress(tamTru))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationReligion(religion))
      return res.json({ status: 0, error: "RELIGION_ERROR!" });
    if (!validationEducationLevel(educationLevel))
      return res.json({ status: 0, error: "EDUCATION_LEVEL_ERROR!" });
    if (!validationJob(job))
      return res.json({ status: 0, error: "JOB_ERROR!" });
    try {
      const person = await Person.create({
        personId,
        fullName,
        birthday,
        sex,
        village,
        thuongTru,
        tamTru,
        religion,
        educationLevel,
        job,
      });
      return res.json({ status: 1, stt: person.stt });
    } catch (e) {
      return res.json({ status: 0, error: "ADD_PERSON_ERROR!" });
    }
  }

  async updatePerson(req, res) {
    const {
      stt,
      personId,
      fullName,
      birthday,
      sex,
      village,
      thuongTru,
      tamTru,
      religion,
      educationLevel,
      job,
    } = req.body;
    if (!(await validationStt(stt, req.session.group, req.session.username)))
      return res.json({ status: 0, error: "STT_ERROR!" });
    if (!(await validationPersonId(personId, "update")))
      return res.json({ status: 0, error: "PERSON_ID_ERROR!" });
    if (!validationFullName(fullName))
      return res.json({ status: 0, error: "FULL_NAME_ERROR!" });
    if (!validationBirthday(birthday))
      return res.json({ status: 0, error: "BIRTHDAY_ERROR!" });
    if (!validationSex(sex))
      return res.json({ status: 0, error: "SEX_ERROR!" });
    if (!validationAddress(village))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationAddress(thuongTru))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationAddress(tamTru))
      return res.json({ status: 0, error: "ADDRESS_ERROR!" });
    if (!validationReligion(religion))
      return res.json({ status: 0, error: "RELIGION_ERROR!" });
    if (!validationEducationLevel(educationLevel))
      return res.json({ status: 0, error: "EDUCATION_LEVEL_ERROR!" });
    if (!validationJob(job))
      return res.json({ status: 0, error: "JOB_ERROR!" });
    try {
      await Person.update(
        {
          personId,
          fullName,
          birthday,
          sex,
          village,
          thuongTru,
          tamTru,
          religion,
          educationLevel,
          job,
        },
        {
          where: {
            stt,
          },
        }
      );
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "UPDATE_PERSON_ERROR!" });
    }
  }

  async deletePerson(req, res) {
    const { stt } = req.body;
    if (!(await validationStt(stt, req.session.group, req.session.username)))
      return res.json({ status: 0, error: "STT_ERROR!" });
    try {
      await Person.destroy({
        where: {
          stt,
        },
      });
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "DELETE_PERSON_ERROR!" });
    }
  }

  //Lấy danh sách dân số theo huyện/nhóm huyện
  async getPersonByDistrict(req, res) {
    const { ids = [] } = req.body;
    try {
      const districtNames = [];
      var personsResult = [];
      for (const id of ids) {
        const data = await validationDistrictId(
          id,
          "getPerson",
          req.session.username,
          req.session.group
        );
        if (data) {
          const district = data.district;
          districtNames.push(await district.getAddress());
        }
      }

      for (const districtName of districtNames) {
        const persons = await Person.findAll({
          where: {
            thuongTru: {
              [Op.like]: `%${districtName}%`,
            },
          },
        });
        personsResult = personsResult.concat(persons);
      }
      return res.json({ status: 1, persons: personsResult });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_BY_DISTRICT_ERROR!" });
    }
  }

  //Lấy danh sách dân số theo xã/nhóm xã
  async getPersonByWard(req, res) {
    const { ids = [] } = req.body;
    try {
      const wardNames = [];
      var personsResult = [];
      for (const id of ids) {
        const data = await validationWardId(
          id,
          "getPerson",
          req.session.username,
          req.session.group
        );
        if (data) {
          const ward = data.ward;
          wardNames.push(await ward.getAddress());
        }
      }

      for (const wardName of wardNames) {
        const persons = await Person.findAll({
          where: {
            thuongTru: {
              [Op.like]: `%${wardName}%`,
            },
          },
        });
        personsResult = personsResult.concat(persons);
      }
      return res.json({ status: 1, persons: personsResult });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_BY_WARD_ERROR!" });
    }
  }

  //Lấy lại mk cho cấp dưới
  async getNewPassword(req, res) {
    const { id } = req.body;
    if (req.session.group == "a1") {
      if (!(await validationProvinceId(id, "getNewPassword"))) {
        return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
      }
    }
    if (req.session.group == "a2") {
      if (
        !(await validationDistrictId(
          id,
          "getNewPassword",
          req.session.username,
          req.session.group
        ))
      ) {
        return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
      }
    }
    if (req.session.group == "a3") {
      if (
        !(await validationWardId(
          id,
          "getNewPassword",
          req.session.username,
          req.session.group
        ))
      ) {
        return res.json({ status: 0, error: "WARD_ID_ERROR!" });
      }
    }
    if (req.session.group == "b1") {
      if (
        !(await validationVillageId(
          id,
          "getNewPassword",
          req.session.username,
          req.session.group
        ))
      ) {
        return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
      }
    }
    try {
      const hash = bcrypt.hashSync(id, parseInt(SALT_ROUND));
      await User.update(
        { password: hash },
        {
          where: { username: id },
        }
      );
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "GET_NEW_PASSWORD_ERROR!" });
    }
  }

  async getPercentAge(req, res) {
    const percentAgeFemale = await Person.getPercentAgeFemale(req.address);
    const percentAgeMale = await Person.getPercentAgeMale(req.address);
    return res.json({
      status: 1,
      male: percentAgeMale,
      female: percentAgeFemale,
    });
  }

  async getPercentRegion(req, res) {
    const { tag } = req.body;
    if (tag == "province" || tag == "") {
      const percentCity = await Person.getPercentRegionCity(req.address);
      return res.json({ status: 1, city: percentCity, country: 1 - percentCity });
    } else {
      return res.json({ status: 0, error: "GET_PERCENT_REGION_ERROR!" });
    }
  }

  async getPercentMigrate(req, res) {
    const {tag} = req.body;
    if (tag == "") {
      const percentMigrate = await Person.getPercentMigrate();
      return res.json({ status: 1, migrate: percentMigrate });
    } else {
      return res.json({ status: 0, error: "GET_PERCENT_MIGRATE_ERROR!" });
    }
  }

  async getPercentGroupAge(req, res) {
    const percentGroupAge = await Person.getPercentGroupAge(req.address);
    return res.json({ status: 1, groupAge: percentGroupAge });
  }

  async getPercentReligion(req, res) {    
    const percentReligion = await Person.getPercentReligion(req.address);
    return res.json({ status: 1, religion: percentReligion });
  }

  async getPercentEducation(req, res) {
    const { tag } = req.body;
    if (tag == "province" || tag == "") {
      const percentEducationFemale = 
        await Person.getPercentEducationFemale(
          req.address
        );
      const percentEducationMale = await Person.getPercentEducationMale(
        req.address
      );
      return res.json({
        status: 1,
        male: percentEducationMale,
        female: percentEducationFemale,
      });
    } else {
      return res.json({ status: 0, error: "GET_PERCENT_EDUCATION_ERROR!" });
    }
  }

  async getPercentGender(req, res) {
    const percentGender = await Person.getPercentGender(req.address);
    return res.json({ 
      status: 1, 
      percentGender,
      amountPerson: req.amountPerson
    });
  }

  async getPercentUnemployment(req, res) {
    const percentUnemployment = await Person.getPercentUnemployment(req.address);
    return res.json({
      status: 1,
      percentUnemployment,
    });
  }

  async getDistricts(req, res) {
    const { ids } = req.body;
    var districts = [];
    try {
      if (!ids || !Array.isArray(ids)) {
        return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
      }
      for (const id of ids) {
        const data = await validationProvinceId(id, "getDistricts");
        if (!data) {
          return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
        } else {
          districts.push(...(await data.province.getDistricts()).map(district => {
            return {
              id: district.districtId,
              name: district.districtName,
            }
          }));
        }
      }
      return res.json({ status: 1, districts });
    } catch (err) {
      return res.json({ status: 0, error: "GET_DISTRICTS_ERROR!" });
    }
  }

  async getWards(req, res) {
    const { ids } = req.body;
    var wards = [];
    try {
      if (!ids || !Array.isArray(ids)) {
        return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
      }
      for (const id of ids) {
        const data = await validationDistrictId(id, "getWards", req.session.username, req.session.group);
        if (!data) {
          return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
        } else {
          wards.push(...(await data.district.getWards()).map(ward => {
            return {
              id: ward.wardId,
              name: ward.wardName
            }
          }));
        }
      }
      return res.json({ status: 1, wards });
    } catch (err) {
      return res.json({ status: 0, error: "GET_WARDS_ERROR!" });
    }
  }

  async getVillages(req, res) {
    const { ids } = req.body;
    var villages = [];
    try {
      if (!ids || !Array.isArray(ids)) {
        return res.json({ status: 0, error: "WARD_ID_ERROR!" });
      }
      for (const id of ids) {
        const data = await validationWardId(id, "getVillages", req.session.username, req.session.group);
        if (!data) {
          return res.json({ status: 0, error: "WARD_ID_ERROR!" });
        } else {
          villages.push(...(await data.ward.getVillages()).map(village => {
            return {
              id: village.villageId,
              name: village.villageName
            }
          }));
        }
      }
      return res.json({ status: 1, villages });
    } catch (err) {
      return res.json({ status: 0, error: "GET_VILLAGES_ERROR!" });
    }
  }
}

module.exports = new UserController();
