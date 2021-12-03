const siteRouter = require('./site');
const adminRouter = require('./admin');
const a1Router = require('./a1');
const a2Router = require('./a2');
const a3Router = require('./a3');
const b1Router = require('./b1');
const b2Router = require('./b2');

module.exports = (app) => {
  app.use('/admin', adminRouter);
  app.use('/', siteRouter);
  app.use('/a1', a1Router);
  app.use('/a2', a2Router);
  app.use('/a3', a3Router);
  app.use('/b1', b1Router);
  app.use('/b2', b2Router);
}
