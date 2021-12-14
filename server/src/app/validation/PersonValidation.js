const { Op } = require("sequelize");

const Person = require('../model/Person');
const Province = require('../model/Province');
const District = require('../model/District');
const Ward = require('../model/Ward');
const Village = require('../model/Village');

class PersonValidation {
  async validationStt(stt, group, username) {
    if (!stt) return false;
    if (isNaN(stt)) return false;
    if (parseInt(stt) <= 0) return false;
    try {
      if (group == "a1" || group == "admin") {
        const person = await Person.findOne({
          where: {
            stt,
          },
        });
        if (!person) return false;
        return true;
      }

      if (group == "a2") {
        const province = await Province.findOne({
          where: {
            provinceId: username
          },
        });
        if (!province) return false;
        const person = await Person.findOne({
          where: {
            stt: stt,
            thuongTru: {
              [Op.like]: `%${province.provinceName}%`,
            },
          },
        });
        if (!person) return false;
        return true;
      }

      if (group == "a3") {
        const district = await District.findOne({
          where: {
            districtId: username
          },
        });
        if (!district) return false;
        const address = district.getAddress();
        const person = await Person.findOne({
          where: {
            stt,
            thuongTru: {
              [Op.like]: `%${address}%`,
            },
          },
        });
        if (!person) return false;
        return true;
      }

      if (group == "b1") {
        const ward = await Ward.findOne({
          where: {
            wardId: username,
          },
        });
        if (!ward) return false;
        const address = await ward.getAddress();
        const person = await Person.findOne({
          where: {
            stt,
            thuongTru: {
              [Op.like]: `%${address}%`,
            },
          },
        });
        if (!person) return false;
        return true;
      }

      if (group == "b2") {
        const village = await Village.findOne({
          where: {
            villageId: username,
          },
        });
        if (!village) return false;
        const address = await village.getAddress();
        const person = await Person.findOne({
          where: {
            stt,
            thuongTru: {
              [Op.like]: `%${address}%`,
            },
          },
        });
        if (!person) return false;
        return true;
      }
    } catch (e) {
      return false;
    }
    return true;
  }
  async validationPersonId(personId, tag, username, group) {
    if (!personId) return true;
    personId = personId.toString();
    if (!personId.match(/^[\d]{9,12}$/g)) return false;
    try {
      if (tag == 'add') {
        const person = await Person.findOne({
          where: {
            personId,
          },
        });
        if (person) return false;
      } 
      if (tag == 'update') {
        const person = await Person.findOne({
          where: {
            personId,
          },
        });
        if (!person) return false;
      }
      if (tag == 'getPerson') {
        if (group == "a1" || group == "admin") {
          const person = await Person.findOne({
            where: {
              personId,
            },
          });
          if (!person) return false;
          return true;
        }

        if (group == "a2") {
          const province = await Province.findOne({
            where: {
              provinceId: username,
            },
          });
          if (!province) return false;
          const person = await Person.findOne({
            where: {
              personId,
              thuongTru: {
                [Op.like]: `%${province.provinceName}%`,
              },
            },
          });
          if (!person) return false;
          return true;
        }

        if (group == "a3") {
          const district = await District.findOne({
            where: {
              districtId: username,
            },
          });
          if (!district) return false;
          const address = district.getAddress();
          const person = await Person.findOne({
            where: {
              personId,
              thuongTru: {
                [Op.like]: `%${address}%`,
              },
            },
          });
          if (!person) return false;
          return true;
        }

        if (group == "b1") {
          const ward = await Ward.findOne({
            where: {
              wardId: username,
            },
          });
          if (!ward) return false;
          const address = await ward.getAddress();
          const person = await Person.findOne({
            where: {
              personId,
              thuongTru: {
                [Op.like]: `%${address}%`,
              },
            },
          });
          if (!person) return false;
          return true;
        }

        if (group == "b2") {
          const village = await Village.findOne({
            where: {
              villageId: username,
            },
          });
          if (!village) return false;
          const address = await village.getAddress();
          const person = await Person.findOne({
            where: {
              personId,
              thuongTru: {
                [Op.like]: `%${address}%`,
              },
            },
          });
          if (!person) return false;
          return true;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  validationBirthday(birthday) {
    if (!birthday) return false;
    birthday = birthday.toString();
    const day = new Date(birthday);
    if (isNaN(day.getTime())) return false;
    return true;
  }
  validationSex(sex) {
    if (sex == null || sex == undefined) return false;
    if (typeof sex != "boolean") return false;
    return true;
  }
  validationAddress(village) {
    if (!village) return false;
    village = village.toString();
    if (
      !village.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9,]{8,140}$/g
      )
    ) {
      return false;
    }
    return true;
  }
  validationReligion(religion) {
    if (!religion) return false;
    if (
      !religion.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    return true;
  }
  validationEducationLevel(educationLevel) {
    if (!educationLevel) return false;
    if (
      !educationLevel.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    return true;
  }
  validationJob(job) {
    if (!job) return false;
    if (
      !job.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    return true;
  }
}


module.exports = new PersonValidation();