const User = require('../model/User')

async function UpdateRoleAll(username) {
  try {
    const user = await User.findOne({
      where: {
        username:username,
      }
    });
    if (user) {
      if (user.role == 'view') {
        return true;
      } else {
        await User.update(
          {
            role: "view",
          },
          {
            where: {
              username: username,
            },
          }
        );
      }
    }
    const users = await user.getUsers();
    if (users.length == 0) {
      return true;
    }
    for (const user of users) {
      await UpdateRoleAll(user.username);
    }
  } catch (e) {
    return false;
  }
}

module.exports = {UpdateRoleAll};