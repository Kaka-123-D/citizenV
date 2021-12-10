const { Sequelize } = require('sequelize');

class SequelizeConnect {
  constructor(databaseName, username, password) {
    this.sequelize = new Sequelize(databaseName, username, password, {
      host: 'localhost',
      dialect: 'mysql'
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connect to citizens success!');
    } catch (error) {
      console.error('Unable to connect to the database!');
    }
  }
}

module.exports = new SequelizeConnect('citizens', 'root', null);
