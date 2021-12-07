const schedule = require('node-schedule');

const User = require('../model/User');
const Province = require('../model/Province');
const Permission = require('../model/Permission');
const siteController = require('./SiteController');

const {validationProvinceId, validationProvinceName} = require('../validation');
const {validationTextDes} = require('../validation');

class A1Controller {
  index(req, res) {
    res.json({title: 'Hello A1'});
  }

  async declare(req, res) {
    const {provinceId, provinceName, textDes} = req.body;
    if (!validationProvinceId(provinceId)) return res.json({ status: 0, error: 'PROVINCEID_ERROR'});
    if (!validationProvinceName(provinceName)) return res.json({ status: 0, error: 'PROVINCENAME_ERROR'});
    if (!validationTextDes(textDes)) return res.json({ status: 0, error: 'TEXTDES_ERROR'});
    try {
      await Province.sync();
      await Province.create({provinceId, provinceName, textDes});
      return res.json({status: 1});
    } catch {
      return res.json({ status: 0, error: 'DECLARE_ERROR'});
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
    const {provinceId} = req.body;
    if (!validationProvinceId(provinceId)) return res.json({ status: 0, error: 'USERNAME_ERROR!'});
    if (await !siteController.register({username: provinceId, password: provinceId, role:'view', group:'a2'})) {
      return res.json({ status: 0, error: 'REGISTER_ERROR'});
    }
    return res.json({ status: 1})
  }
}

module.exports = new A1Controller;