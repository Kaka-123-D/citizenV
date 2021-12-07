const User = require('../model/User');

class AdminMiddleware {

  async index(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    if (user.group != 'admin') return res.json({status: 0, error: 'ACCESS_DENIED'});
    next();
  }
}

module.exports = new AdminMiddleware;