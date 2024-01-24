'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false,
                    validate:{
                        notEmpty: true,                        
                    },
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
                    validate:{
                        notEmpty: true,                        
                    },
      },
      time_start: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      time_end: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      details: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      no_of_participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:2,
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
      entry_fee: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0,
        allowNull:false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};