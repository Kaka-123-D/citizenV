const Province = require("../model/Province");
const Permission = require("../model/Permission"); 
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
      if (tag == "getPerson") {
        if (!province) return false;
        if (!user) return false;
      }
      if (tag == "grantDeclare") {
        if (!province) return false;
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
        if (!province) return false;
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

  async validationProvinceName(provinceName) {
    if (!provinceName) return false;
    if (
      !provinceName.match(
        /^(tỉnh|thành phố)[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g
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

  validationTime(timeStart, timeEnd) {
    if (!timeStart || !timeEnd) return false;
    timeStart = timeStart.toString();
    timeEnd = timeEnd.toString();
    const timeStartD = new Date(timeStart);
    const timeEndD = new Date(timeEnd);
    const now = new Date();
    if (isNaN(timeStartD.getTime()) || isNaN(timeEndD.getTime())) return false;
    if (timeStartD - now < 0 || timeEndD - now <= 0 || timeEndD - timeStartD <= 0)
      return false;
    return true;
  }
}

module.exports = new ProvinceValidation();
