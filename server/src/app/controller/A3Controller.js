
class A3Controller {
  index(req, res) {
    res.json({title: 'Hello A3'});
  }
}

module.exports = new A3Controller;