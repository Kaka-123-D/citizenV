const siteController = require('./SiteController');
const {validationUsername, validationPassword} = require('../validation');
const {validationFullName, validationPhone} = require('../validation');
const {validationRole, validationGroup} = require('../validation');

class AdminController {
  index(req, res) {
    res.json({title: 'Hello Admin'});
  }

  async register(req, res) {
    const {username, password, fullName, phone, role, group} = req.body;
    if (!validationUsername(username)) return res.json({ status: 0, error: 'USERNAME_ERROR!'});
    if (!validationPassword(password)) return res.json({ status: 0, error: 'PASSWORD_ERROR'});
    if (!validationFullName(fullName)) return res.json({ status: 0, error: 'FULLNAME_ERROR'});
    if (!validationPhone(phone)) return res.json({ status: 0, error: 'PHONE_ERROR'});
    if (!validationRole(role)) return res.json({ status: 0, error: 'ROLE_ERROR'});
    if (!validationGroup(group)) return res.json({ status: 0, error: 'GROUP_ERROR'});
    if (await !siteController.register({username, password, fullName, phone, role, group})) {
      return res.json({ status: 0, error: 'REGISTER_ERROR'});
    }
    return res.json({ status: 1})
  }
}

module.exports = new AdminController;