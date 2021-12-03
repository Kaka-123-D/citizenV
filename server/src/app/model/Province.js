const { DataTypes, Model } = require('sequelize');
const db = require('../../config/sequelizeConfig');

const sequelize = db.sequelize;

class Province extends Model {
  
}

Province.init({
  provinceId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  }, 
  provinceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  textDescription: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Province',
  tableName: 'provinces',
});

module.exports = Province;


