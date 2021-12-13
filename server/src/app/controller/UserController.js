const schedule = require("node-schedule");

const User = require("../model/User");
const Permission = require("../model/Permission");
const Person = require("../model/Person");

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

class UserController {
  //Cấp quyền khai báo
  async grantDeclare(req, res) {
    const {
      ids = [],
      timeStart,
      timeEnd,
    } = req.body;
    //
    if (!validationTime(timeStart, timeEnd)) {
      return res.json({ status: 0, error: "TIME_ERROR!" });
    }
    const timeStartD = new Date(timeStart);
    const timeEndD = new Date(timeEnd);
    //
    for (const id of ids) {
      if (!await validationProvinceId(id, 'grantDeclare')) {
        return res.json({ status: 0, error: "PROVINCE_ID_ERROR!" });
      }
    }
    //
    try {
      for (const id of ids) {
        //
        const user = await User.findOne({ where: { username: id } });
        const permission = await Permission.create({ 
          timeStart: timeStartD,
          timeEnd: timeEndD
        });
        await user.setPermission(permission);
        //
        schedule.scheduleJob(timeStartD, async () => {
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
        schedule.scheduleJob(timeEndD, async () => {
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
      }
      //
      res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "GRANT_DECLARE_ERROR!" });
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
    if (!await validationPersonId(personId, 'add'))
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
      await Person.sync();
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
    if (!await validationStt(stt, req.session.group, req.session.username)) 
      return res.json({ status: 0, error: "STT_ERROR!" });
    if (!await validationPersonId(personId, 'update'))
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
      await Person.update({
        personId,
        fullName,
        birthday,
        sex,
        village,
        thuongTru,
        tamTru,
        religion,
        educationLevel,
        job
      }, {
        where: {
          stt,
        }
      });
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "UPDATE_PERSON_ERROR!" });
    }
  }

  async deletePerson(req, res) {
    const {stt} = req.body;
    if (!validationStt(stt))
      return res.json({ status: 0, error: "STT_ERROR!" });
    try {
      await Person.destroy({
        where: {
          stt,
        }
      })
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "DELETE_PERSON_ERROR!" });
    }
  }
}

module.exports = new UserController();
