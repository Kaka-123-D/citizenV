const jwt = require('jsonwebtoken');
const process = require('process');

class LoginMiddleware {

  index(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      res.json({ status: 0});
    } else {
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        res.json({ status: 0 });
      } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          if (err) {
            res.json({ status: 0 });
          } else {
            req.username = data.username;
            next();
          }
        });
      }
    }
  }
}

module.exports = new LoginMiddleware;