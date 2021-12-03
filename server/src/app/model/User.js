const { DataTypes, Model } = require('sequelize');
const db = require('../../config/sequelizeConfig');

const sequelize = db.sequelize;

class User extends Model {
  
}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

User.hasMany(User, {
  foreignKey: 'managerId',
});

User.belongsTo(User, {
  foreignKey: 'managerId',
});

module.exports = User;


