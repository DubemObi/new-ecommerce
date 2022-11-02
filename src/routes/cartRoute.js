const express = require("express");
const CartController = require("../controllers/cartController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();
const router = express.Router();

const { addToCart, updateCart, getCart, deleteCart } = CartController;

router.route("/").post(auth, addToCart).get(auth, getCart);
router.delete("/:id", auth, deleteCart);

router.put("/:id", auth, updateCart);

module.exports = router;
