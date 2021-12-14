const User = require('../model/User')

async function UpdateRoleAll(username) {
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (user) {
      await User.update({
        role: 'view'
      }, {
        where: {
          username
        }
      });
    }
    const users = await user.getUsers();
    if (users.length == 0) {
      return true;
    }
    for (const u of users) {
      await UpdateRoleAll(u.username);
    }
  } catch (e) {
    return false;
  }
}

module.exports = {UpdateRoleAll};