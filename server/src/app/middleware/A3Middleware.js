const User = require('../model/User');

class A3Middleware {

  async index(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    if (user.group != 'a3') return res.json({status: 0, error: 'ACCESS_DENIED'});
    next();
  }
}

module.exports = new A3Middleware;