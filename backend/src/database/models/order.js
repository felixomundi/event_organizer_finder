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
    payment_mode: DataTypes.STRING,
    tracking_no: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};