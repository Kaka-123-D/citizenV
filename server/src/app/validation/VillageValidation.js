const Village = require("../model/Village");
const User = require("../model/User");
const Permission = require("../model/Permission");

class VillageValidation {
  async validationVillageId(villageId, tag, username, group) {
    if (!villageId) return false;
    if (!villageId.match(/^[0-9]{8}$/g)) return false;
    if (group != "a1" || group != "admin") {
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
      if (tag == "getNewPassword") {
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
        return { village, user, permission };
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
        return { village, user, permission };
      }

      return {village, user};
    } catch (e) {
      return false;
    }
  }

  async validationVillageName(villageName, username) {
    if (!villageName) return false;
    if (
      !villageName.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9]{2,25}$/g
      )
    ) {
      return false;
    }
    try {
      const village = await Village.findOne({
        where: {
          villageName: villageName,
          wardId: username
        },
      });
      if (village) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  validationVillageType(villageType) {
    const villageTypes = ["Thôn", "Bản", "Tổ Dân Phố", "Làng", "Xóm"];
    if (!villageType) return false;
    if (!villageTypes.includes(villageType)) return false;
    return true;
  }
}

module.exports = new VillageValidation();
