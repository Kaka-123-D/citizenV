const path = require('path');
const bcrypt = require('bcrypt');

const User = require('../model/User');

const {SESS_NAME, SALT_ROUND} = process.env;


class SiteController {

  home(req, res) {
    res.sendFile(path.join(process.cwd(), 'src/dist', 'index.html'));
  }

  async register(data) {
    try { 
      const hash = bcrypt.hashSync(data.password, parseInt(SALT_ROUND));
      await User.sync();
      return await User.create({
        username: data.username,
        password: hash,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
        group: data.group
      });
    } catch {
      return null;
    }
  }

  async login(req, res) {
    const data = req.body;
    if (!data) {
      res.json({ status: 0 });
    } else {
      if (!data.username || !data.password) {
        res.json({ status: 0 });
      } else {
        try {
          const user = await User.findOne({
            where: {username: data.username}
          });
          if (!user) {
            res.json({ status : 0 });
          } else {
            if (bcrypt.compareSync(data.password, user.password)) {
              req.session.username = data.username;
              return res.json({ status: 1, group: user.group});
            }
            res.json({ status : 0 });
          }
        } catch(err) {
          res.json({ status: 0 });
        }
      }
    }
  }

  async logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.json({status: 0});
      }
      res.clearCookie(SESS_NAME);
      res.json({status: 1});
    })
  }

  async test(req, res) {
    const date1 = new Date();
    const date2 = new Date(2021, 11, 28, 20 ,0, 0);
    console.log(date2, date1,date2 - date1);
    res.json({status: 1});
  }
}

module.exports = new SiteController;