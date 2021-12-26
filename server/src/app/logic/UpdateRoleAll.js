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
      const permission = await Permission.findOne({
        where: {
          userId: user.userId
        }
      });
      if (!permission) return;
      if (!permission.isFinish) {
        if (user.role == "view") {
          await Permission.update(
            { isFinish: true },
            {
              where: {
                userId: user.userId,
                isFinish: false,
              },
            }
          );
          schedule.cancelJob(`end_${user.userId}`);
          console.log(`CANCEL_DECLARE_SUCCESS! - id:${user.username}`);
          return;
        }
        if (user.role == "edit") {
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
          await Permission.update(
            { isFinish: true },
            {
              where: {
                userId: user.userId,
                isFinish: false,
              },
            }
          );
          if (tag == 'cancel') {
            schedule.cancelJob(`end_${user.userId}`);
            console.log(`CANCEL_DECLARE_SUCCESS! - id:${user.username}`);
          } else {
            console.log(`GRANT_DECLARE_END! - id:${user.username}`);
          }
        }
      } else {
        return;
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
