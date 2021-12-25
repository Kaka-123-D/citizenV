const { DataTypes, Model } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../../config/db");

const sequelize = db.sequelize;

class Person extends Model {
  static async getPercentAgeMale(address) {
    const percentAgeMale = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentAgeMale( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        percentAgeMale.push(result[i]["0"][`age_${i * 5}`]);
      }
      return percentAgeMale;
    } catch (e) {
      return [];
    }
  }

  static async getPercentAgeFemale(address) {
    const percentAgeFemale = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentAgeFemale( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        percentAgeFemale.push(result[i]["0"][`age_${i * 5}`]);
      }
      return percentAgeFemale;
    } catch (e) {
      return [];
    }
  }

  static async getAmountPerson(address) {
    try {
      const result = await sequelize.query(
        "CALL getAmountPerson( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      return result[0]["0"]["amountPerson"];
    } catch (e) {
      return 0;
    }
  }

  static async getPercentRegionCity(address) {
    try {
      const result = await sequelize.query(
        "SELECT getPercentRegionCity( :address ) as r;",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      return result[0]["r"];
    } catch (e) {
      return 0;
    }
  }

  static async getPercentMigrate() {
    const percentMigrate = [];
    try {
      const result = await sequelize.query("CALL getPercentMigrate();", {
        type: QueryTypes.SELECT,
      });
      for (let i = 0; i < result.length - 1; i++) {
        percentMigrate.push(result[i]["0"][`row_${i + 1}`]);
      }
      return percentMigrate;
    } catch (e) {
      return [];
    }
  }

  static async getPercentGroupAge(address) {
    const percentGroupAge = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentGroupAge( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        percentGroupAge.push(Math.floor(result[i]["0"][`age_${i}`] * 10000) / 10000);
      }
      return percentGroupAge;
    } catch (e) {
      return [];
    }
  }

  static async getPercentReligion(address) {
    const percentReligion = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentReligion( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        const percent = result[i]["0"][`r_${i + 1}`];
        percentReligion.push(Math.floor(percent * 10000) / 10000);
      }
      return percentReligion;
    } catch (e) {
      return [];
    }
  }

  static async getPercentEducationMale(address) {
    const percentEducationMale = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentEducationMale( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        percentEducationMale.push(result[i]["0"][`m_${i + 1}`]);
      }
      return percentEducationMale;
    } catch (e) {
      return [];
    }
  }

  static async getPercentEducationFemale(address) {
    const percentEducationFemale = [];
    try {
      const result = await sequelize.query(
        "CALL getPercentEducationFemale( :address );",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      for (let i = 0; i < result.length - 1; i++) {
        percentEducationFemale.push(result[i]["0"][`f_${i + 1}`]);
      }
      return percentEducationFemale;
    } catch (e) {
      return [];
    }
  }

  static async getPercentMale(address) {
    try {
      const result = await sequelize.query(
        "SELECT getPercentMale( :address ) as m;",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      return result[0]["m"];
    } catch (e) {
      return 0;
    }
  }

  static async getPercentUnemployment(address) {
    try {
      const result = await sequelize.query(
        "SELECT getPercentUnemployment( :address ) as u;",
        {
          type: QueryTypes.SELECT,
          replacements: {
            address: address,
          },
        }
      );
      return result[0]["u"];
    } catch (e) {
      return 0;
    }
  }
}

Person.init(
  {
    stt: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    personId: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: false,
    },
    village: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Person",
    tableName: "persons",
    charset: "utf8",
  }
);

module.exports = Person;
