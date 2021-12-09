const User = require('../model/User');
const Province = require('../model/Province');

class Validation {

  async validationUsername(username) {
    if (!username.match(/^[a-zA-Z0-9]{2,20}$/g)) return false;
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    if (user) return false;
    return true;
  }

  validationPassword(password) {
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)) {
      return false;
    }
    return true;
  }

  validationFullName(fullName) {
    if (!fullName.match(/^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{4,50}$/g)) {
      return false;
    }
    return true;
  }

  validationPhone(phone) {
    if (!phone.match(/^(\+84)([0-9]{9,10})$/g)) return false;
    return true;
  }

  validationRole(role) {
    const roles = ['all', 'view', 'edit'];
    if (!roles.includes(role)) return false;
    return true;
  }

  validationGroup(group) {
    console.log("group on server: ", group);
    const groups = ['admin', 'a1', 'a2', 'a3', 'b1', 'b2'];
    if (!groups.includes(group)) return false;
    return true;
  }

  async validationProvinceId(provinceId) {
    if (!provinceId.match(/^[0-9]{2}/g)) return false;
    const province = await Province.findOne({
      where: {
        provinceId: provinceId
      }
    });
    if (province) return false;
    return true;
  }

  async validationProvinceName(provinceName) {
    if (!provinceName.match(/^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{5,25}$/g)) {
      return false;
    }
    const province = await Province.findOne({
      where: {
        provinceName: provinceName
      }
    });
    if (province) return false;
    return true;
  }

  validationTextDes(textDes) {
    if (!textDes.match(/^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9]{8,140}$/g)) {
      return false;
    }
    return true;
  }

  async validationUserProvinceId(provinceId) {
    if (!provinceId.match(/^[0-9]{2}/g)) return false;
    const province = await Province.findOne({
      where: {
        provinceId: provinceId
      }
    });
    const user = await User.findOne({
      where: {
        username: provinceId
      }
    });
    if (!province) return false;
    if (user) return false;
    return true;
  }
}

module.exports = new Validation;