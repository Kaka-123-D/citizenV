const Village = require("../model/Village");
const User = require("../model/User");
const Permission = require("../model/Permission");

class VillageValidation {
  async validationVillageId(villageId, tag, username, group) {
    if (!villageId) return false;
    if (!villageId.match(/^[0-9]{8}$/g)) return false;
    if (group != 'a1' || group != 'admin') {
      if (!villageId.startsWith(username)) return false;
    }
    try {
      const village = await Village.findOne({
        where: {
          villageId: villageId,
        },
      });
      const user = await User.findOne({
        where: {
          username: villageId,
        },
      });
      if (tag == "declare") {
        if (village) return false;
      }
      if (tag == "register") {
        if (!village) return false;
        if (user) return false;
      }
      if (tag == "getPerson") {
        if (!village) return false;
        if (!user) return false;
      }
      if (tag == "grantDeclare") {
        if (!village) return false;
        if (!user) return false;
        const permission = await Permission.findOne({
          where: {
            userId: user.userId,
          },
        });
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
        if (!village) return false;
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

  async validationVillageName(villageName) {
    if (!villageName) return false;
    if (
      !villageName.match(
        /^(thôn|làng|tổ dân phố|bản)[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      const village = await Village.findOne({
        where: {
          villageName: villageName,
        },
      });
      if (village) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new VillageValidation();
