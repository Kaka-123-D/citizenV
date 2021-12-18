
class B1Middleware {

  async index(req, res, next) {
    try {
      if (req.session.group != "b1")
        return res.json({ status: 0, error: "ACCESS_DENIED" });
      next();
    } catch (e) {
      return res.json({ status: 0, error: "ACCESS_DENIED" });
    }
  }
}

module.exports = new B1Middleware;