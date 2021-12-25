const District = require("../model/District");
const User = require("../model/User");
const Permission = require("../model/Permission");

class DistrictValidation {
  async validationDistrictId(districtId, tag, username, group) {
    if (!districtId) return false;
    if (!districtId.match(/^[0-9]{4}$/g)) return false;
    if (group != "a1" && group != "admin") {
      if (!districtId.startsWith(username)) return false;
    }
    try {
      const district = await District.findOne({
        where: {
          districtId: districtId,
        },
      });
      const user = await User.findOne({
        where: {
          username: districtId,
        },
      });
      if (tag == "declare") {
        if (district) return false;
      }
      if (tag == "register") {
        if (!district) return false;
        if (user) return false;
      }
      if (tag == "getPerson" || tag == "getNewPassword" || tag == "getWards") {
        if (!district) return false;
        if (!user) return false;
      }
      if (tag == "grantDeclare") {
        if (!district) return false;
        if (!user) return false;
        const permission = await Permission.findOne({
          where: {
            userId: user.userId,
          },
        });
        if (permission) {
          if (permission.isFinish == false) {
            return false;
          } else {
            await Permission.destroy({
              where: {
                userId: user.userId,
              },
            });
          }
        }
        return { district, user, permission };
      }

      if (tag == "cancelDeclare") {
        if (!district) return false;
        if (!user) return false;
        const permission = await Permission.findOne({
          where: {
            userId: user.userId,
          },
        });
        if (!permission) return false;
        if (permission.isFinish == true) return false;
        return { district, user, permission };
      }

      return {district, user};
    } catch (e) {
      return false;
    }
  }

  async validationDistrictName(districtName, username) {
    if (!districtName) return false;
    if (
      !districtName.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      const district = await District.findOne({
        where: {
          districtName: districtName,
          provinceId: username
        },
      });
      if (district) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  validationDistrictType(districtType) {
    const districtTypes = ["huyện", "quận", "thành phố"];
    if (!districtType) return false;
    if (!districtTypes.includes(districtType)) return false;
    return true;
  }
}

module.exports = new DistrictValidation();
