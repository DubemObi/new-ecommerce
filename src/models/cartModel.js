const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: "1",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subTotal: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
