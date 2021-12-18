const { DataTypes, Model } = require("sequelize");
const db = require("../../config/sequelizeConfig");
const Ward = require("./Ward");

const sequelize = db.sequelize;

class Village extends Model {
  async getAddress() {
    const ward = await Ward.findOne({
      where: {
        wardId: this.wardId
      }
    })
    const wardAddress = await ward.getAddress();
    return `${this.villageType} ${this.villageName}, ${wardAddress}`;
  }
}

Village.init(
  {
    villageId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    villageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    villageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textDes: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Village",
    tableName: "villages",
    charset: "utf8",
  }
);

Ward.hasMany(Village, {
  foreignKey: "wardId",
});

Village.belongsTo(Ward, {
  foreignKey: "wardId",
});

module.exports = Village;
