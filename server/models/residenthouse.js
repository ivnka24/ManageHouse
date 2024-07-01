'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResidentHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResidentHouse.belongsTo(models.Residents, { foreignKey: 'ResidentId' });
      ResidentHouse.belongsTo(models.House, { foreignKey: 'HouseId' });
    }
  }
  ResidentHouse.init({
    HouseId: DataTypes.INTEGER,
    ResidentId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    exitDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ResidentHouse',
  });
  return ResidentHouse;
};