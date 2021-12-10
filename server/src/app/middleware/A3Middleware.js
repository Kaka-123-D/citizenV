const User = require('../model/User');

class A3Middleware {

  async index(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });
      if (user.group != "a3")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }
}

module.exports = new A3Middleware;