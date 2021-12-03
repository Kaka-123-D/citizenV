
class B1Controller {
  index(req, res) {
    res.send('Hello B1');
  }
}

module.exports = new B1Controller;