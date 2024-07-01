'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Residents, { foreignKey: 'ResidentId' });

    }
  }
  Payment.init({
    ResidentId: DataTypes.INTEGER,
    typePayment: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    datePayment: DataTypes.DATE,
    periodPayment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};