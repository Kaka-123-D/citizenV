const { DataTypes, Model } = require("sequelize");
const db = require("../../config/sequelizeConfig");
const District = require("./District");

const sequelize = db.sequelize;

class Ward extends Model {}

Ward.init(
  {
    wardId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    wardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textDes: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Ward",
    tableName: "wards",
    charset: "utf8",
  }
);

District.hasMany(Ward, {
  foreignKey: "districtId",
});

Ward.belongsTo(District, {
  foreignKey: "districtId",
});

module.exports = Ward;
