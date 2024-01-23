'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderItems);
      this.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    coupon_code: DataTypes.STRING,
    payment_mode: DataTypes.STRING,
    address: DataTypes.STRING,
    shipcode: DataTypes.STRING,
    tracking_no: DataTypes.STRING,
    discount: DataTypes.DECIMAL,
    discounted_total:DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};