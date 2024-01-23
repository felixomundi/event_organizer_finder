'use strict';
/** @type {import('sequelize-cli').Migration} */
const src = 'uploads\x0e1695135131871.png';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
                validate:{
                    notEmpty: true,                 
                   
                },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate:{
            notEmpty: true
        },
      },
      quantity: {
        type: Sequelize.INTEGER(11),
        defaultValue:0,   
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: src,
            allowNull: false,
            validate:{
                notEmpty: true
            },
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
    await queryInterface.dropTable('Products');
  }
};