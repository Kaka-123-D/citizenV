
class B2Controller {
  index(req, res) {
    res.send('Hello B2');
  }
}

module.exports = new B2Controller;