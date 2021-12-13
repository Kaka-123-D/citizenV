const User = require('../model/User');

class A3Middleware {

  async index(req, res, next) {
    try {
      if (req.session.group != "a3")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }
}

module.exports = new A3Middleware;