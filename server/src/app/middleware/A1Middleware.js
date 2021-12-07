const User = require('../model/User');

class A1Middleware {

  async index(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    if (user.group != 'a1') return res.json({status: 0, error: 'ACCESS_DENIED'});
    next();
  }
}

module.exports = new A1Middleware;