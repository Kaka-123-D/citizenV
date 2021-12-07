const siteRouter = require('./site');
const adminRouter = require('./admin');
const a1Router = require('./a1');
const a2Router = require('./a2');
const a3Router = require('./a3');
const b1Router = require('./b1');
const b2Router = require('./b2');
const loginMiddleware = require('../app/middleware/LoginMiddleware');
const adminMiddleware = require('../app/middleware/AdminMiddleware');
const a1Middleware = require('../app/middleware/A1Middleware');
const a2Middleware = require('../app/middleware/A2Middleware');
const a3Middleware = require('../app/middleware/A3Middleware');
const b1Middleware = require('../app/middleware/B1Middleware');
const b2Middleware = require('../app/middleware/B2Middleware');

module.exports = (app) => {
  app.use('/admin', loginMiddleware.index, adminMiddleware.index, adminRouter);
  app.use('/a1', loginMiddleware.index, a1Middleware.index, a1Router);
  app.use('/a2', loginMiddleware.index, a2Middleware.index, a2Router);
  app.use('/a3', loginMiddleware.index, a3Middleware.index, a3Router);
  app.use('/b1', loginMiddleware.index, b1Middleware.index, b1Router);
  app.use('/b2', loginMiddleware.index, b2Middleware.index, b2Router);
  app.use('/', siteRouter);
}
