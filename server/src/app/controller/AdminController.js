class AdminController {
  index(req, res) {
    res.json({title: 'Hello Admin'});
  }
}

module.exports = new AdminController;