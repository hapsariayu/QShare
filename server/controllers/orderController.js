const { Costumer, Order } = require("../models");

class orderController {
  static async createOrder(req, res, next) {
    const { productName, quantity, price } = req.body;
    const { id } = req.user;
    try {
      if (!productName || !quantity || !price) throw { name: "Invalid input" };

      const newOrder = {
        productName,
        quantity,
        price,
        CostumerId: id,
      };

      const order = await Order.create(newOrder);

      res.status(201).json({ message: `New order has been created` });
    } catch (error) {
      console.log(error);
      if (error.name === "Invalid input") {
        res.status(400).json({ message: error.name });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async getOrders(req, res, next) {
    const { id } = req.user;
    try {
      const allCustOrders = await Order.findAll({
        where: { CostumerId: id },
      });

      res.status(200).json(allCustOrders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOrder(req, res, next) {
    const { orderId } = req.params;
    try {
      const findOrder = await Order.findByPk(orderId);

      if (!findOrder) throw { name: "Data not found" };

      res.status(200).json(findOrder);
    } catch (error) {
      console.log(error);
      if (error.name === "Data not found") {
        res.status(404).json({ message: error.name });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async updateOrder(req, res, next) {
    const { productName, quantity, price } = req.body;
    const { orderId } = req.params;
    const { id } = req.user;
    console.log(req.body);
    try {
      if (!productName || !quantity || !price) throw { name: "Invalid input" };

      const updateOrder = {
        productName,
        quantity,
        price,
        totalPrice: quantity * price,
        CostumerId: id,
      };

      const order = await Order.update(updateOrder, { where: { id: orderId } });

      res.status(200).json({
        message: `Order with product name ${productName} has been updated`,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "Invalid input") {
        res.status(400).json({ message: error.name });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async deleteOrder(req, res, next) {
    const { orderId } = req.params;
    try {
      const findOrder = await Order.findByPk(orderId);

      if (!findOrder) throw { name: "Data not found" };

      const delOrder = await Order.destroy({ where: { id: orderId } });

      res.status(200).json({
        message: `Order with productName ${findOrder.productName} has been deleted`,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "Data not found") {
        res.status(404).json({ message: error.name });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = orderController;
