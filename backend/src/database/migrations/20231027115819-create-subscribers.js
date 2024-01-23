'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscribers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
                    validate:{
                        notEmpty: true,                        
                    },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
            notEmpty: true,
            isEmail: true,
                        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:"Active",
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
    await queryInterface.dropTable('Subscribers');
  }
};