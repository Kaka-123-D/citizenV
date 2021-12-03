class AdminController {
  index(req, res) {
    res.send('Hello Admin');
  }
}

module.exports = new AdminController;