'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
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
      eventId: {
        type: Sequelize.INTEGER,
                  allowNull: false,
                  validate: {
                      notEmpty: true,                      
          },
          onDelete:"CASCADE",
          references: {
            model: "Events",
            key: "id",
            as:"eventId",
                  },
      },
      no_participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1,
      },
      total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue:0
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:"active"
      },    
      creatorId: {
        type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,                      
        },
        onDelete:"CASCADE",
        references: {
          model: "Users",
          key: "id",
          as:"creatorId",
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
    await queryInterface.dropTable('Tickets');
  }
};