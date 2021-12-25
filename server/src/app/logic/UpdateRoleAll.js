const schedule = require("node-schedule");

const User = require("../model/User");
const Permission = require("../model/Permission");

async function UpdateRoleAll(username, tag) {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      if (user.role == "view") {
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
        if (tag == "cancel") {
          schedule.cancelJob(`end_${username}`);
        } 
        await Permission.update(
          { isFinish: true },
          {
            where: {
              userId: user.userId,
              isFinish: false,
            },
          }
        );
        console.log("GRANT_DECLARE_END!");
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

module.exports = { UpdateRoleAll };
