const District = require("../model/District");
const User = require("../model/User");

class DistrictValidation {
  async validationDistrictId(districtId, tag, username, group) {
    if (!districtId) return false;
    if (!districtId.match(/^[0-9]{4}$/g)) return false;
    if (group != 'a1' || group != 'admin') {
      if (!districtId.startWith(username)) return false;
    }
    try {
      //Delete in product
      await District.sync();
      const district = await District.findOne({
        where: {
          districtId: districtId,
        },
      });
      //Delete in product
      await User.sync();
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
      if (tag == "grantDeclare" || tag == "getPerson") {
        if (!district) return false;
        if (!user) return false;
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
      //Delete in product
      await District.sync();
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
