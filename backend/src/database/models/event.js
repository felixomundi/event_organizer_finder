'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    event_name: DataTypes.STRING,
    location: DataTypes.STRING,
    time_start: DataTypes.STRING,
    time_end: DataTypes.STRING,
    event_date: DataTypes.DATE,
    details: DataTypes.STRING,
    no_of_participants: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    entry_fee: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    image:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};