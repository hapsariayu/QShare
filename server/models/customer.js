"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "Email can not be empty",
          },
          notNull: {
            msg: "Email can not be null",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password can not be empty",
          },
          notNull: {
            msg: "Password can not be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
      hooks: {
        beforeCreate(newUser) {
          newUser.password = hashPassword(newUser.password);
        },
      },
    }
  );
  return Customer;
};
