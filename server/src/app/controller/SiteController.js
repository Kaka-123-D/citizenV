const path = require("path");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../../config/db");
const {QueryTypes} = require('sequelize');
const sequelize = db.sequelize;

dotenv.config();

const User = require("../model/User");
const Permission = require('../model/Permission')

const { SESS_NAME, SALT_ROUND } = process.env;

const {
  validationUsername,
  validationPassword,
} = require("../validation/UserValidation");
const Person = require("../model/Person");

class SiteController {
  
  home(req, res) {
    res.send('Hello');
  }

  async register(data) {
    try {
      const hash = bcrypt.hashSync(data.password, parseInt(SALT_ROUND));
      const user = await User.create({
        username: data.username,
        password: hash,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
        group: data.group,
      });
      return {user};
    } catch {
      return false;
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    var user = null;
    const data = await validationUsername(username, "login");
    if (!data) {
      return res.json({ status: 0, error: "USERNAME_ERROR!" });
    } else {
      user = data.user;
    }
    try {
      //
      var isFirstLogin = false;
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ status: 0, error: "PASSWORD_ERROR!" });
      }
      const permission = await Permission.findOne({
        where: {
          userId: user.userId,
        },
      });
      //Create session to user
      req.session.username = username;
      req.session.group = user.group;
      req.session.userId = user.userId;
      await User.update({lastLogin: new Date()}, {
        where: {
          username: username
        }
      });
      if (!user.lastLogin) {
        isFirstLogin = true;
      }
      //
      return res.json({
        status: 1,
        group: user.group,
        isFirstLogin,
        permission,
      });
    } catch (e) {
      return res.json({ status: 0, error: "LOGIN_ERROR!" });
    }
  }

  async changePassword(req, res) {
    const { curPassword, newPassword } = req.body;
    try {
      const user = await User.findOne({
        where: { username: req.session.username },
      });
      if (!bcrypt.compareSync(curPassword, user.password)) {
        return res.json({ status: 0, error: "CURRENT_PASSWORD_ERROR!" });
      }
      if (!validationPassword(newPassword)) {
        return res.json({ status: 0, error: "NEW_PASSWORD_ERROR!" });
      }
      const hash = bcrypt.hashSync(newPassword, parseInt(SALT_ROUND));
      await User.update(
        { password: hash },
        {
          where: { username: req.session.username },
        }
      );
      return res.json({ status: 1 });
    } catch (e) {
      return res.json({ status: 0, error: "CHANGE_PASSWORD_ERROR!" });
    }
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      //
      if (err) {
        return res.json({ status: 0 });
      }
      //
      res.clearCookie(SESS_NAME);
      //
      res.json({ status: 1 });
    });
  }

  async test(req, res) {
    console.log(await Person.getPercentRegionCity());
    res.json({ status: 1 });
  }
}

module.exports = new SiteController();
