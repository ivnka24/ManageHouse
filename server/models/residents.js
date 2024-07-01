"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Residents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Residents.hasMany(models.Payment, { foreignKey: "ResidentId" });
      Residents.belongsToMany(models.House, {
        through: models.ResidentHouse,
        foreignKey: "ResidentId",
      });
    }
  }
  Residents.init(
    {
      fullName: DataTypes.STRING,
      photoIdentityCard: DataTypes.STRING,
      residentStatus: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      statusMarriage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Residents",
    }
  );
  return Residents;
};
