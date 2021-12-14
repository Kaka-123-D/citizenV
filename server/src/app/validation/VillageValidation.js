const Village = require("../model/Village");
const User = require("../model/User");

class VillageValidation {
  async validationVillageId(villageId, tag, username, group) {
    if (!villageId) return false;
    if (!villageId.match(/^[0-9]{8}$/g)) return false;
    if (group != 'a1' || group != 'admin') {
      if (!villageId.startWith(username)) return false;
    }
    try {
      //Delete in product
      await Village.sync();
      const village = await Village.findOne({
        where: {
          villageId: villageId,
        },
      });
      //Delete in product
      await User.sync();
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
      if (tag == "grantDeclare" || tag == "getPerson") {
        if (!village) return false;
        if (!user) return false;
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
      //Delete in product
      await Village.sync();
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
