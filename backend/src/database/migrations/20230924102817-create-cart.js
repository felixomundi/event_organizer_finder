'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
                validate: {
                    notEmpty: true,                      
        },
        onDelete:"CASCADE",
        references: {
          model: "Products",
          key: "id",
          as:"productId",
                },
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
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
                validate: {
                    notEmpty: true,
                },
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0,
            allowNull: false,
            validate:{
                notEmpty: true,
            }

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
    await queryInterface.dropTable('Carts');
  }
};