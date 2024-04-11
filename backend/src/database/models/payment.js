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
    }
  }
  Payment.init({
    orderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    description: DataTypes.STRING,
    MerchantRequestID: DataTypes.STRING,
    CheckoutRequestID: DataTypes.STRING,
    ResultDesc: DataTypes.STRING,
    MpesaReceiptNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};