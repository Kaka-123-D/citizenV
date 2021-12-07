const User = require('../model/User');

class A2Middleware {

  async index(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    if (user.group != 'a2') return res.json({status: 0, error: 'ACCESS_DENIED'});
    next();
  }
}

module.exports = new A2Middleware;