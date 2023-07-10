const orderController = require("../controllers/orderController");
const authentication = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authentication, orderController.createOrder);
router.get("/", authentication, orderController.getOrders);
router.put("/:orderId", authentication, orderController.updateOrder);
router.get("/:orderId", authentication, orderController.getOrder);
router.delete("/:orderId", authentication, orderController.deleteOrder);

module.exports = router;
