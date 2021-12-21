const { DataTypes, Model } = require('sequelize');
const db = require('../../config/db');

const sequelize = db.sequelize;

class Province extends Model {
  
}

Province.init({
  provinceId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  }, 
  provinceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  textDes: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Province',
  tableName: 'provinces',
  charset: 'utf8',
});

module.exports = Province;


