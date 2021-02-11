"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Projects }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Projects, { foreignKey: "projId", as: "project" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        projId: undefined,
      };
    }
  }
  Documents.init(
    {
      did: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      tableName: "documents",
      modelName: "Documents",
    }
  );
  return Documents;
};
