const Ward = require('../model/Ward');
const User = require('../model/User');
const Permission = require('../model/Permission');

class WardValidation {
  async validationWardId(wardId, tag, username, group) {
    if (!wardId) return false;
    if (!wardId.match(/^[0-9]{6}$/g)) return false;
    if (group != "a1" || group != "admin") {
      if (!wardId.startsWith(username)) return false;
    }
    try {
      const ward = await Ward.findOne({
        where: {
          wardId: wardId,
        },
      });
      const user = await User.findOne({
        where: {
          username: wardId,
        },
      });
      if (tag == "declare") {
        if (ward) return false;
      }
      if (tag == "register") {
        if (!ward) return false;
        if (user) return false;
      }
      if (tag == "getPerson") {
        if (!ward) return false;
        if (!user) return false;
      }
      if (tag == "getNewPassword") {
        if (!ward) return false;
        if (!user) return false;
      }
      if (tag == "grantDeclare") {
        if (!ward) return false;
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
        return { ward, user, permission };
      }

      if (tag == "cancelDeclare") {
        if (!ward) return false;
        if (!user) return false;
        const permission = await Permission.findOne({
          where: {
            userId: user.userId,
          },
        });
        if (!permission) return false;
        if (permission.isFinish == true) return false;
        return { ward, user, permission };
      }

      return {user, ward};
    } catch (e) {
      return false;
    }
  }

  async validationWardName(wardName, username) {
    if (!wardName) return false;
    if (
      !wardName.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      const ward = await Ward.findOne({
        where: {
          wardName: wardName,
          districtId: username
        },
      });
      if (ward) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  validationWardType(wardType) {
    const wardTypes = ["xã", "phường", "thị trấn"];
    if (!wardType) return false;
    if (!wardTypes.includes(wardType)) return false;
    return true;
  }
}

module.exports = new WardValidation();