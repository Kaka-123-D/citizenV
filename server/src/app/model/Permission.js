const { DataTypes, Model } = require('sequelize');
const db = require('../../config/sequelizeConfig');
const User = require('./User');

const sequelize = db.sequelize;

class Permission extends Model {
  
}

Permission.init({
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, 
  timeStart: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timeEnd: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Permission',
  tableName: 'permissions',
});

User.hasOne(Permission, {
  foreignKey: "userId"
});

Permission.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = Permission;


