"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ResidentHouses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      HouseId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Houses",
        },
      },
      ResidentId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Residents",
        },
      },
      startDate: {
        type: Sequelize.DATE,
      },
      exitDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ResidentHouses");
  },
};
