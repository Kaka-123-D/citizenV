const { Sequelize } = require('sequelize');

class SequelizeDB {
  constructor(databaseName, username, password) {
    this.sequelize = new Sequelize(databaseName, username, password, {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('--------->Test connect to citizens success!');
      return Promise.resolve();
    } catch (error) {
      console.error("--------->Unable to connect to citizens!");
      return Promise.reject();
    }
  }

  async disconnect() {
    await this.sequelize.close();
  }
}

module.exports = new SequelizeDB("citizens", "root", null);
