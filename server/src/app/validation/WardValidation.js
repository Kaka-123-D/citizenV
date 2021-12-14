const Ward = require('../model/Ward');
const User = require('../model/User');

class WardValidation {
  async validationWardId(wardId, tag, username, group) {
    if (!wardId) return false;
    if (!wardId.match(/^[0-9]{6}$/g)) return false;
    if (group != 'a1' || group != 'admin') {
      if (!wardId.startsWith(username)) return false;
    }
    try {
      //Delete in product
      await Ward.sync();
      const ward = await Ward.findOne({
        where: {
          wardId: wardId,
        },
      });
      //Delete in product
      await User.sync();
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
      if (tag == "grantDeclare" || tag == "getPerson") {
        if (!ward) return false;
        if (!user) return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async validationWardName(wardName) {
    if (!wardName) return false;
    if (
      !wardName.match(
        /^(xã|phường|thị trấn)[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      //Delete in product
      await Ward.sync();
      const ward = await Ward.findOne({
        where: {
          wardName: wardName,
        },
      });
      if (ward) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new WardValidation();