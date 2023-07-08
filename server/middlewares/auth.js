const { decodeToken } = require("../helpers/jwt");
const { Customer, Order } = require("../models");

async function authentication(req, res, next) {
  const access_token = req.headers.access_token;
  try {
    if (!access_token) throw { name: "InvalidToken" };

    const payload = decodeToken(access_token);

    const user = await Customer.findByPk(payload.id);

    if (!user) throw { name: "InvalidToken" };

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log(error);
    if (error.name == "InvalidToken" || error.name == "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = authentication;
