const { verifPassword } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");
const { Costumer, Order } = require("../models");

class customerController {
  static async registerCostumer(req, res, next) {
    const { username, email, password } = req.body;
    try {
      if (!email || !password) throw { name: "Email or password is required" };

      let newUser = {
        username,
        email,
        password,
      };

      let customer = await Costumer.create(newUser);

      res.status(201).json({
        message: `A new accout with email ${customer.email} has been created`,
      });
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else if (error.name == "Email or password is required") {
        res.status(400).json({ message: error.name });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async loginCustomer(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) throw { name: "Email or password is required" };

      const user = await Costumer.findOne({ where: { email } });

      if (!user) throw { name: "Invalid Email or Password" };

      const confirmPassword = verifPassword(password);

      if (!confirmPassword) throw { name: "Invalid Email or Password" };

      const access_token = encodeToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      if (error.name === "Email or password is required") {
        res.status(400).json({ message: error.name });
      } else if (error.name === "Invalid Email or Password") {
        res.status(401).json({ message: error.name });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = customerController;
