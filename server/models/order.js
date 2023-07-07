"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Costumer, { foreignKey: "CustomerId" });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "productName can not be empty",
          },
          notNull: {
            msg: "productName can not be null",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "quantity can not be empty",
          },
          notNull: {
            msg: "quantity can not be null",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price can not be empty",
          },
          notNull: {
            msg: "price can not be null",
          },
        },
      },
      totalPrice: DataTypes.INTEGER,
      CostumerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      hooks: {
        beforeCreate(newOrder) {
          newOrder.totalPrice = newOrder.price * newOrder.quantity;
        },
      },
    }
  );
  return Order;
};
