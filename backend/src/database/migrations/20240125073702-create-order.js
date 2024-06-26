'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
                validate: {
                    notEmpty: true,                      
        },
        onDelete:"CASCADE",
        references: {
          model: "Users",
          key: "id",
          as:"userId",
                },
      },
      status: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue:0,
      },      
      payment_mode: {
        type: Sequelize.STRING,
       allowNull:false, 
      },     
      tracking_no: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
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
    await queryInterface.dropTable('Orders');
  }
};