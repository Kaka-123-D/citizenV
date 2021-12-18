const schedule = require("node-schedule");
const _ = require("lodash");
const { Op } = require("sequelize");

const User = require("../model/User");
const Permission = require("../model/Permission");
const Person = require("../model/Person");
const District = require("../model/District");
const Ward = require("../model/Ward");

const {
  validationProvinceId,
  validationTime,
} = require("../validation/ProvinceValidation");
const {
  validationFullName
} = require("../validation/UserValidation");
const {
  validationStt,
  validationPersonId,
  validationBirthday,
  validationSex,
  validationAddress,
  validationReligion,
  validationEducationLevel,
  validationJob
} = require("../validation/PersonValidation");
const {
  validationDistrictId,
} = require("../validation/DistrictValidation");
const { 
  validationWardId,
} = require("../validation/WardValidation");
const {
  validationVillageId,
} = require("../validation/VillageValidation");
const { UpdateRoleAll } = require("../logic/UpdateRoleAll");

class UserController {
  //Cấp quyền khai báo
  async grantDeclare(req, res) {
    const { ids = [], timeStart, timeEnd } = req.body;
    //
    if (!validationTime(timeStart, timeEnd)) {
      return res.json({ status: 0, error: "TIME_ERROR!" });
    }
    const timeStartD = new Date(timeStart);
    const timeEndD = new Date(timeEnd);
    //
    if (req.session.group == "a1") {
      for (const id of ids) {
        if (!(await validationProvinceId(id, "grantDeclare"))) {
          return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "a2") {
      for (const id of ids) {
        if (
          !(await validationDistrictId(
            id,
            "grantDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "a3") {
      for (const id of ids) {
        if (
          !(await validationWardId(
            id,
            "grantDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "WARD_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "b1") {
      for (const id of ids) {
        if (
          !(await validationVillageId(
            id,
            "grantDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
        }
      }
    }
    //
    try {
      for (const id of ids) {
        const user = await User.findOne({ where: { username: id } });
        const permission = await Permission.create({
          timeStart: timeStartD,
          timeEnd: timeEndD,
          isFinish: false,
          isComplete: false,
        });
        await user.addPermission(permission);
        //
        schedule.scheduleJob(`start_${id}`, timeStartD, async () => {
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
        schedule.scheduleJob(`end_${id}`, timeEndD, async () => {
          await Permission.update(
            { isFinish: true },
            {
              where: {
                permissionId: permission.permissionId,
              },
            }
          );
          console.log("GRANT_DECLARE_END!");
          await UpdateRoleAll(id);
        });
      }
      //
      res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "GRANT_DECLARE_ERROR!" });
    }
  }

  //Hủy quyền khai báo
  async cancelDeclare(req, res) {
    const { ids } = req.body;

    if (req.session.group == "a1") {
      for (const id of ids) {
        if (!(await validationProvinceId(id, "cancelDeclare"))) {
          return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "a2") {
      for (const id of ids) {
        if (
          !(await validationDistrictId(
            id,
            "cancelDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "DISTRICT_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "a3") {
      for (const id of ids) {
        if (
          !(await validationWardId(
            id,
            "cancelDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "WARD_ID_ERROR!" });
        }
      }
    }
    if (req.session.group == "b1") {
      for (const id of ids) {
        if (
          !(await validationVillageId(
            id,
            "cancelDeclare",
            req.session.username,
            req.session.group
          ))
        ) {
          return res.json({ status: 0, error: "VILLAGE_ID_ERROR!" });
        }
      }
    }
    try {
      for (const id of ids) {
        const jobNames = _.keys(schedule.scheduledJobs);
        const user = await User.findOne({
          where: {
            username: id,
          },
        });
        for (const name of jobNames) {
          if (name == `start_${id}`) {
            schedule.cancelJob(name);
          }
          if (name == `end_${id}`) {
            await Permission.update(
              { isFinish: true },
              {
                where: {
                  userId: user.userId,
                  isFinish: false,
                },
              }
            );
            await UpdateRoleAll(id);
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
    if (
      !(await validationPersonId(
        personId,
        "getPerson",
        req.session.username,
        req.session.group
      ))
    )
      return res.json({ status: 0, error: "PERSON_ID_ERROR!" });
    try {
      const person = await Person.findOne({
        where: {
          personId: personId,
        },
      });
      return res.json({ status: 1, person });
    } catch (e) {
      return res.json({ status: 0, error: "GET_PERSON_BY_PERSON_ID_ERROR!" });
    }
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
      await Person.create({
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
      return res.json({ status: 1 });
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
    if (!validationStt(stt))
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
        if (
          await validationDistrictId(
            id,
            "getPerson",
            req.session.username,
            req.session.group
          )
        ) {
          const district = await District.findOne({
            where: { districtId: id },
          });
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
        if (
          await validationWardId(
            id,
            "getPerson",
            req.session.username,
            req.session.group
          )
        ) {
          const ward = await Ward.findOne({
            where: { wardId: id },
          });
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
}

module.exports = new UserController();
