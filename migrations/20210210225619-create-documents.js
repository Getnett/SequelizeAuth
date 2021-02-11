"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      did: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Document must have a title" },
          notEmpty: { msg: "Title must not be empty" },
          min: {
            args: [4],
            msg: "Minimum 4 characters required ",
          },
        },
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " Document must have a about" },
          notEmpty: { msg: "About must not be empty" },
          min: {
            args: [6],
            msg: "Minimum 6 characters required ",
          },
        },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("documents");
  },
};
