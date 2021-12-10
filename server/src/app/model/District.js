const { DataTypes, Model } = require("sequelize");
const db = require("../../config/sequelizeConfig");
const Province = require('./Province');

const sequelize = db.sequelize;

class District extends Model {}

District.init(
  {
    districtId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    districtName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textDes: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "District",
    tableName: "districts",
    charset: "utf8",
  }
);

Province.hasMany(District, {
  foreignKey: 'provinceId'
})

District.belongsTo(Province, {
  foreignKey: 'provinceId'
})

module.exports = District;
