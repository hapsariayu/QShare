const router = require("express").Router();
const costumers = require("./costumer");
const orders = require("./order");

router.use("/costumers", costumers);
router.use("/orders", orders);

module.exports = router;
