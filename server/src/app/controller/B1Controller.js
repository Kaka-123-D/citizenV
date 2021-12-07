
class B1Controller {
  index(req, res) {
    res.json({title: 'Hello B1'});
  }
}

module.exports = new B1Controller;