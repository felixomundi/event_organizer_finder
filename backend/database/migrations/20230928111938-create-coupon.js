'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,        
        allowNull:false,
      },
      coupon_code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
      },
      limits: {
        type: Sequelize.INTEGER,        
      },
      expiry: {
        type: Sequelize.DATE
      },
      coupon_type_Id: {
        type: Sequelize.INTEGER
      },
      status: {
        type:Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Coupons');
  }
};