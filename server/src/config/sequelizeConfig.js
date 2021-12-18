const { Sequelize } = require('sequelize');

class SequelizeConnect {
  constructor(databaseName, username, password) {
    this.sequelize = new Sequelize(databaseName, username, password, {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });
  }

  async testConnect() {
    try {
      await this.sequelize.authenticate();
      console.log('--------->Test connect to citizens success!');
      return Promise.resolve();
    } catch (error) {
      console.error("--------->Unable to connect to citizens!");
      return Promise.reject();
    }
  }

  async disConnectDb() {
    await this.sequelize.close();
  }
}

module.exports = new SequelizeConnect('citizens', 'root', null);
