
class B2Controller {
  index(req, res) {
    res.json({title: 'Hello B2'});
  }
}

module.exports = new B2Controller;