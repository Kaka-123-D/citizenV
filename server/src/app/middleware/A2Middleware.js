const User = require('../model/User');

class A2Middleware {
  async index(req, res, next) {
    try {
      if (req.session.group != "a2")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }

  async roleCUD(req, res, next) {
    if (req.session.role != 'edit') 
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    next();
  }
}

module.exports = new A2Middleware;