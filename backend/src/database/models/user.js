'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cart)
      this.hasMany(models.Order, { foreignKey: 'userId' })
      this.hasMany(models.Ticket,{foreignKey:'userId'})
      
    }

   
  }
 
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
async function generateHash(user) {
    if (user === null) {
        throw new Error('User is null');
    }
    else if (!user.changed('password')) return user.password;
    else {
        let salt = bcrypt.genSaltSync(10);
        return user.password = bcrypt.hashSync(user.password, salt);
    }
}
User.beforeCreate(generateHash);
User.beforeUpdate(generateHash);
  return User;
};