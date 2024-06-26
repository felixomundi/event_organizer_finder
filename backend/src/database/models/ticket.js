'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Event);
    }
  }
  Ticket.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    no_of_participants: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    creatorId:DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};