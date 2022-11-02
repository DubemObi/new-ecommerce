const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoute");
const productRoutes = require("./src/routes/productRoutes");
const cartRoute = require("./src/routes/cartRoute");
const orderRoute = require("./src/routes/orderRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const accessLogStream = fs.createWriteStream(
  path.join("./src/utils", "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

module.exports = app;
