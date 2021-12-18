
class AdminMiddleware {

  async index(req, res, next) {
    try {
      if (req.session.group != "admin")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }
}

module.exports = new AdminMiddleware;