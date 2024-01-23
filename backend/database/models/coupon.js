'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init({
    name: DataTypes.STRING,
    coupon_code: DataTypes.STRING,
    limits: DataTypes.INTEGER,
    expiry: DataTypes.DATE,
    coupon_type_Id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    amount:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};