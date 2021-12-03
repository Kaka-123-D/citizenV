const { DataTypes, Model } = require('sequelize');
const db = require('../../config/sequelizeConfig');

const sequelize = db.sequelize;

class Token extends Model {
  
}

Token.init({
  tokenId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, 
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Token',
  tableName: 'token',
});

module.exports = Token;


