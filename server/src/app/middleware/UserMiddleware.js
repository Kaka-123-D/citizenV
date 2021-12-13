
class UserMiddleware {
  async roleCUD(req, res, next) {
    if (req.session.role != "edit")
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    next();
  }
}

module.exports = new UserMiddleware();
