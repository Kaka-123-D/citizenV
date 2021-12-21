const { DataTypes, Model } = require("sequelize");
const db = require("../../config/db");
const Province = require('./Province');

const sequelize = db.sequelize;

class District extends Model {
  async getAddress() {
    const province = await Province.findOne({
      where: {
        provinceId: this.provinceId,
      },
    });
    return `${this.districtType} ${this.districtName}, ${province.provinceType} ${province.provinceName}`;
  }
}

District.init(
  {
    districtId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    districtType: {
      type: DataTypes.STRING,
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
