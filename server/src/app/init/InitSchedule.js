const schedule = require("node-schedule");
const Permission = require("../model/Permission");
const User = require("../model/User");
const { UpdateRoleAll } = require("../logic/UpdateRoleAll");

class InitSchedule {
  static async init() {
    try {
      const permissions = await Permission.findAll({
        where: {
          isFinish: false,
        },
      });

      for (const permission of permissions) {
        const user = await User.findOne({
          where: {
            userId: permission.userId
          }
        });
        if (permission.timeEnd > new Date()) {
          if (permission.timeStart > new Date()) {
            schedule.scheduleJob(`start_${user.username}`, permission.timeStart, async function () {
              console.log("GRANT_DECLARE_START!");
              await User.update(
                { role: "edit" },
                {
                  where: {
                    username: user.username,
                  },
                }
              );
            });
          } else {
            console.log("GRANT_DECLARE_START!");
            await User.update(
              { role: "edit" },
              {
                where: {
                  username: user.username,
                },
              }
            );
          }
          schedule.scheduleJob(`end_${user.username}`, permission.timeEnd, async function () {
              await Permission.update(
                { isFinish: true },
                {
                  where: {
                    permissionId: permission.permissionId,
                  },
                }
              );
              console.log("GRANT_DECLARE_END!");
              await UpdateRoleAll(user.username);
            }
          );
        } else {
          await Permission.update(
            { isFinish: true },
            {
              where: {
                permissionId: permission.permissionId,
              },
            }
          );
          console.log("GRANT_DECLARE_END!");
          await UpdateRoleAll(user.username);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = InitSchedule;