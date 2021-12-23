const { DataTypes, Model } = require('sequelize');
const db = require('../../config/db');

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
  fullName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastLogin: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  charset: 'utf8',
});

User.hasMany(User, {
  foreignKey: 'managerId',
});

User.belongsTo(User, {
  foreignKey: 'managerId',
});

module.exports = User;


