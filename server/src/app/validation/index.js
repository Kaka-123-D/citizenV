const User = require('../model/User');

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

  validationProvinceId(provinceId) {
    return true;
  }

  validationProvinceName(provinceName) {
    return true;
  }

  validationTextDes(textDes) {
    return true;
  }
}

module.exports = new Validation;