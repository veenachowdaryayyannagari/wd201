"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userID",
      });
      // define association here
    }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userID: userId,
      });
    }

    static async remove(id, userId) {
      return this.destroy({ where: { id: id, userID: userId } });
    }

    static async update({ title, dueDate, completed }) {
      return this.update({
        title: title,
        dueDate: dueDate,
        completed: completed,
      });
    }

    static async getDueToday(userID) {
      const d = new Date().toLocaleDateString("en-CA");
      const today = await this.findAll({
        where: { dueDate: { [Op.eq]: d }, completed: false, userID: userID },
      });
      return today;
    }

    static async getDueLater(userID) {
      const d = new Date().toLocaleDateString("en-CA");
      const later = await this.findAll({
        where: { dueDate: { [Op.gt]: d }, completed: false, userID: userID },
      });
      return later;
    }

    static async getOverDue(userID) {
      const d = new Date().toLocaleDateString("en-CA");
      const overdue = await this.findAll({
        where: { dueDate: { [Op.lt]: d }, completed: false, userID: userID },
      });
      return overdue;
    }

    static async getCompleted(userID) {
      const complete = await this.findAll({
        where: { completed: true, userID: userID },
      });
      return complete;
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }

    setCompletionStatus(status) {
      return this.update({ completed: status });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
