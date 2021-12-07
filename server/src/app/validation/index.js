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
    return true;
  }

  validationPhone(phone) {
    return true;
  }

  validationRole(role) {
    return true;
  }

  validationGroup(group) {
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

  validationProvinceName(provinceName) {
    // if (!provinceName.match(/^[]/g))
    return true;
  }

  validationTextDes(textDes) {
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