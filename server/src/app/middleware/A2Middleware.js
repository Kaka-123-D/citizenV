const User = require('../model/User');

class A2Middleware {

  async index(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });
      if (user.group != "a2")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }
}

module.exports = new A2Middleware;