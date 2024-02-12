'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      phone: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue: "+254712345678",
        validate:{
          notEmpty: true,
      },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
            defaultValue:"user",
            validate:{
                notEmpty: true,
            },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
            validate:{
                notEmpty: true,
                min:6,
            },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
            defaultValue:"active",
            validate:{
                notEmpty: true,
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
    },
    {
      initialAutoIncrement: 1,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};