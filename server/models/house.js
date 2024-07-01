'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.belongsToMany(models.Residents, { through: models.ResidentHouse, foreignKey: 'HouseId' });

    }
  }
  House.init({
    address: DataTypes.STRING,
    statusHouse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};