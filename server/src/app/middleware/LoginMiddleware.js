
class LoginMiddleware {
  
  index(req, res, next) {
    if (!req.session.username) {
      res.json({ status: 0, error: 'ACCESS_DENIED'});
    } else {
      next();
    }
  }
}

module.exports = new LoginMiddleware;