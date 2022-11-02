const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: [true, "Cart is required"],
  },

  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
