const District = require("../model/District");
const User = require("../model/User");
const Permission = require("../model/Permission");

class DistrictValidation {
  async validationDistrictId(districtId, tag, username, group) {
    if (!districtId) return false;
    if (!districtId.match(/^[0-9]{4}$/g)) return false;
    if (group != 'a1' || group != 'admin') {
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
      if (tag == "getPerson") {
        if (!district) return false;
        if (!user) return false;
      }
      if (tag == "grantDeclare") {
        if (!district) return false;
        if (!user) return false;
        const permission = await Permission.findOne({
          where: {
            userId: user.userId
          }
        })
        if (!permission) return true;
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
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  async validationDistrictName(districtName) {
    if (!districtName) return false;
    if (
      !districtName.match(
        /^(huyện|thành phố|quận)[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      const district = await District.findOne({
        where: {
          districtName: districtName,
        },
      });
      if (district) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new DistrictValidation();
