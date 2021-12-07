
class LoginMiddleware {

  index(req, res, next) {
    if (!req.session.username) {
      res.json({ status: 0});
    } else {
      next();
    }
  }
}

module.exports = new LoginMiddleware;