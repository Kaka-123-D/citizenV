const Province = require("../model/Province");
const User = require("../model/User");

class ProvinceValidation {
  async validationProvinceId(provinceId, tag) {
    if (!provinceId) return false;
    if (!provinceId.match(/^[0-9]{2}$/g)) return false;
    try {
      //Delete in product
      await Province.sync();
      const province = await Province.findOne({
        where: {
          provinceId: provinceId,
        },
      });
      //Delete in product
      await User.sync();
      const user = await User.findOne({
        where: {
          username: provinceId,
        },
      });
      if (tag == "declare") {
        if (province) return false;
      }
      if (tag == "register") {
        if (!province) return false;
        if (user) return false;
      }
      if (tag == "grantDeclare") {
        if (!province) return false;
        if (!user) return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async validationProvinceName(provinceName) {
    if (!provinceName) return false;
    if (
      !provinceName.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
      )
    ) {
      return false;
    }
    try {
      //Delete in product
      await Province.sync();
      const province = await Province.findOne({
        where: {
          provinceName: provinceName,
        },
      });
      if (province) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  validationTextDes(textDes) {
    if (!textDes) return true;
    if (
      !textDes.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9]{8,140}$/g
      )
    ) {
      return false;
    }
    return true;
  }

  validationTimeStart(year, month, day, hour, minute) {
    return true;
  }

  validationHowLong(howLong) {
    return true;
  }
}

module.exports = new ProvinceValidation();
