const app = require("./index");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
// app.use(express.json());

mongoose.connect(process.env.mongoDB);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
