const {checkNumberString} = require('../logic/CheckNumberString')

class UserMiddleware {
  index(req, res, next) {
    const query = req.url.split('/').filter((url, index) => index >= 2).join('/');
    if (!checkNumberString(req.username)) {
      req.url = '/a1/' + query;
    } else if (req.username.length == 2) {
      req.url = '/a2/' + query;
    } else if (req.username.length == 4) {
      req.url = '/a3/' + query;
    } else if (req.username.length == 6) {
      req.url = '/b1/' + query;
    } else if (req.username.length == 8) {
      req.url = '/b2/' + query;
    }
    next();
  }
}

module.exports = new UserMiddleware;