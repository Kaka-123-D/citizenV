const siteRouter = require('./site');
const adminRouter = require('./admin');
const a1Router = require('./a1');
const a2Router = require('./a2');
const a3Router = require('./a3');
const b1Router = require('./b1');
const b2Router = require('./b2');
const loginMiddleware = require('../app/middleware/LoginMiddleware');

module.exports = (app) => {
  app.use('/admin', loginMiddleware.index, adminRouter);
  app.use('/a1', loginMiddleware.index, a1Router);
  app.use('/a2', loginMiddleware.index, a2Router);
  app.use('/a3', loginMiddleware.index, a3Router);
  app.use('/b1', loginMiddleware.index, b1Router);
  app.use('/b2', loginMiddleware.index, b2Router);
  app.use('/', siteRouter);
}
