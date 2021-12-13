const User = require('../model/User');

class UserMiddleware {
  async roleCUD(req, res, next) {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    if (user.role != "edit")
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    next();
  }
}

module.exports = new UserMiddleware();
