'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
                validate: {
                    notEmpty: true,                      
        },
        onDelete:"CASCADE",
        references: {
          model: "Orders",
          key: "id",
          as:"orderId",
                },
      },
      status: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      MerchantRequestID: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
      },
      CheckoutRequestID: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
      },
      ResultDesc: {
        type: Sequelize.STRING
      },
      MpesaReceiptNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
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
    await queryInterface.dropTable('Payments');
  }
};