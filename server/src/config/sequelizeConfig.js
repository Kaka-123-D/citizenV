const { Sequelize } = require('sequelize');

class SequelizeConnect {
  constructor(databaseName, username, password) {
    this.sequelize = new Sequelize(databaseName, username, password, {
      host: 'sql6.freemysqlhosting.net',
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

module.exports = new SequelizeConnect('sql6456079', 'sql6456079', 'f3t9c5UtgG');
