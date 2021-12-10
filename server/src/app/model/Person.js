const { DataTypes, Model } = require("sequelize");
const db = require("../../config/sequelizeConfig");

const sequelize = db.sequelize;

class Person extends Model {}

Person.init(
  {
    personId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    village: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thuongTru: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamTru: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    educationLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Person",
    tableName: "persons",
    charset: "utf8",
  }
);

module.exports = Person;
