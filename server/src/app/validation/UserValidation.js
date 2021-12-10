const User = require("../model/User");

class UserValidation {
  async validationUsername(username, tag) {
    if (!username) return false;
    if (!username.match(/^[a-zA-Z0-9]{2,20}$/g)) return false;
    await User.sync();
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (tag == 'register') {
      if (user) return false;
    }
    if (tag == 'login') {
      if (!user) return false;
    }
    return true;
  }

  validationPassword(password) {
    if (!password) return false;
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
      )
    ) {
      return false;
    }
    return true;
  }

  validationFullName(fullName) {
    if (!fullName) return false;
    if (
      !fullName.match(
        /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{4,50}$/g
      )
    ) {
      return false;
    }
    return true;
  }

  validationPhone(phone) {
    if (!phone) return false;
    if (!phone.match(/^(\+84)([0-9]{9,10})$/g)) return false;
    return true;
  }

  validationRole(role) {
    if (!role) return false;
    const roles = ["all", "view", "edit"];
    if (!roles.includes(role)) return false;
    return true;
  }

  validationGroup(group) {
    if (!group) return false;
    const groups = ["admin", "a1", "a2", "a3", "b1", "b2"];
    if (!groups.includes(group)) return false;
    return true;
  }
}

module.exports = new UserValidation();
