const path = require("path");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
const User = require("../model/User");

const { SESS_NAME, SALT_ROUND } = process.env;
const {
  validationUsername,
  validationPassword,
} = require("../validation/UserValidation");

class SiteController {
  home(req, res) {
    res.sendFile(path.join(process.cwd(), "src/dist", "index.html"));
  }

  async register(data) {
    try {
      const hash = bcrypt.hashSync(data.password, parseInt(SALT_ROUND));
      return await User.create({
        username: data.username,
        password: hash,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
        group: data.group,
      });
    } catch {
      return null;
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!(await validationUsername(username, "login"))) {
      return res.json({ status: 0, error: "USERNAME_ERROR!" });
    }
    try {
      //
      const user = await User.findOne({
        where: { username: username },
      });
      //
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ status: 0, error: "PASSWORD_ERROR!" });
      }
      //Create session to user
      req.session.username = username;
      req.session.group = user.group;
      req.session.userId = user.userId;
      //
      return res.json({ status: 1, group: user.group });
    } catch (e) {
      return res.json({ status: 0, error: "LOGIN_ERROR!" });
    }
  }

  async changePassword(req, res) {
    const {curPassword, newPassword} = req.body;
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
      await User.update({password: hash}, {
        where: { username: req.session.username}
      });
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
    await UpdateRoleAll('03');
    res.json({ status: 1 });
  }
}

module.exports = new SiteController();
