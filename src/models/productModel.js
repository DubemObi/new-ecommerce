const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter the product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  price: {
    type: Number,
    required: [true, "Enter the price"],
  },
  image: {
    type: String,
    required: [true, "Add image URL"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
