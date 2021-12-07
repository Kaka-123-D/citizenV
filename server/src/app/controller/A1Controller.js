const bcrypt = require('bcrypt');
const process = require('process');
const schedule = require('node-schedule');

const User = require('../model/User');
const Province = require('../model/Province');
const Permission = require('../model/Permission');

class A1Controller {
  index(req, res) {
    res.json({title: 'Hello A1'});
  }

  async declare(req, res) {
    const data = req.body;
    if (!data) {
      res.json({status: 0});
    } else {
      if (!data.provinceId || !data.provinceName) {
        res.json({ status: 0});
      } else {
        await Province.sync();
        const province = await Province.findOne({
          where: {
            provinceId: data.provinceId
          }
        })
        if (province) {
          res.json({status: 0});
        } else {
          await Province.create({
            provinceId: data.provinceId, 
            provinceName: data.provinceName,
            textDescription: data.textDescription
          });
          res.json({status: 1});
        }
      }
    }
  }

  async grantDeclare(req, res) {
    const data = req.body;
    if (!data) {
      res.json({status: 0});
    } else {
      if (!data.username || !data.dayStart || !data.monthStart || !data.yearStart
        || !data.dayEnd || !data.monthEnd || !data.yearEnd) {
          res.json({status: 0});
        } else {
          const timeStart = new Date(data.yearStart, data.monthStart - 1, data.dayStart, data.hourStart, data.minuteStart);
          const timeEnd = new Date(data.yearEnd, data.monthEnd - 1, data.dayEnd, data.hourEnd, data.minuteEnd);
          const now = new Date();
          if (timeStart - now < 0 || timeEnd - now < 0 || timeEnd - timeStart < 0) {
            console.log('thoi gian nho hon');
            res.json({status: 0});
          } else {
            const currentUser = data.username;
            const user = await User.findOne({where: {username: currentUser}});
            if (!user) {
              res.json({status: 0});
            } else {
              await Permission.sync();
              const permission = await Permission.create({timeStart, timeEnd});
              await user.setPermission(permission);
              const startDeclare = schedule.scheduleJob(timeStart, async () => {
                console.log('Bat dau dat lich!');
                await User.update({role: 'edit'}, {
                  where: {
                    username: currentUser
                  }
                });
              });

              const endDeclare = schedule.scheduleJob(timeEnd, async () => {
                console.log('Ket thuc lich');
                await User.update({role: 'view'}, {
                  where: {
                    username: currentUser
                  }
                });
              })

              res.json({status: 1});
            }
          }
        }
    }
  }

  async getProvinces(req, res) {
    const provinces = await Province.findAll({
      attributes: ['provinceId', 'provinceName']
    });
    res.json({provinces: provinces});
  }

  async register(req, res) {
    const data = req.body;
    if (!data) {
      res.json({ status: 0 });
    } else {
      if (!data.provinceId) {
        res.json({ status: 0 });
      } else {
        const user = await User.findOne({
          attributes: ['username'],
          where: {
            username: data.provinceId
          }
        });
        if (user) {
          res.json({ status: 0 });
        } else {
          bcrypt.hash(data.provinceId, parseInt(process.env.SALT_ROUND), async (err, hash) => {
            await User.create({
              username: data.provinceId,
              password: hash,
              role: 'view'
            });
            res.json({ status : 1});
          });
        }
      }
    }
  }
}

module.exports = new A1Controller;