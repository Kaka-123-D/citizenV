
class HomeMiddleware {

  index(req, res, next) {
    if (req.session.username) {
      res.json({ status: 0, error: 'USER_LOGGING'});
    } else {
      next();
    }
  }
}

module.exports = new HomeMiddleware;