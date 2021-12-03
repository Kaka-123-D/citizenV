const User = require('../model/User');
const {checkNumberString} = require('../logic/CheckNumberString')


class UserMiddleware {
  async index(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.username
    }});
    if (user.role === 'admin') {
      res.redirect('/admin/' + req.url);
    } else if (!checkNumberString(req.username)) {
      res.redirect('/a1/' + req.url);
    } else if (req.username.length == 2) {
      res.redirect('/a2/' + req.url);
    } else if (req.username.length == 4) {
      res.redirect('/a3/' + req.url);
    } else if (req.username.length == 6) {
      res.redirect('/b1/' + req.url);
    } else if (req.username.length == 8) {
      res.redirect('/b2/' + req.url);
    }
  }
}

module.exports = new UserMiddleware;