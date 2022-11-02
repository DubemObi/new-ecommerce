const express = require("express");
const OrderController = require("../controllers/orderController");
const { checkOut } = require("../controllers/checkoutController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

const router = express.Router();

const { getAllOrders, getOrder } = OrderController;
router.get("/", auth, checkUser("admin"), getAllOrders);
router.get("/:id", auth, getOrder);

router.post("/checkout/:id", auth, checkOut);
router.get("order-history", auth);

module.exports = router;
