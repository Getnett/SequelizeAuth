"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Documents }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Documents, { foreignKey: "projId", as: "documents" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      };
    }
  }
  Projects.init(
    {
      pid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Project must have a title" },
          notEmpty: { msg: "Title must not be empty" },
          min: {
            args: [4],
            msg: "Minimum 4 characters required ",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " Project must have a description" },
          notEmpty: { msg: "Description must not be empty" },
          min: {
            args: [10],
            msg: "Minimum 10 characters required ",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "projects",
      modelName: "Projects",
    }
  );
  return Projects;
};
