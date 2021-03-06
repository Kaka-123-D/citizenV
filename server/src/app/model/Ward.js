const { DataTypes, Model } = require("sequelize");
const db = require("../../config/db");
const District = require("./District");
const Province = require("./Province");

const sequelize = db.sequelize;

class Ward extends Model {

  async getAddress() {
    const district = await District.findOne({
      where: {
        districtId: this.districtId
      }
    })
    const districtAddress = await district.getAddress();
    return `${this.wardType} ${this.wardName}, ${districtAddress}`;
  }
}

Ward.init(
  {
    wardId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    wardType: {
      type: DataTypes.STRING,
      allowNull: false
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
