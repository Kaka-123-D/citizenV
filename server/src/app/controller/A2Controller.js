
class A2Controller {
  index(req, res) {
    res.json({title: 'Hello A2'});
  }
}

module.exports = new A2Controller;