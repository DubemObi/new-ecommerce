const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your name "],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    minlength: [6, "Password is less than 6 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Re-enter your password"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "vendor", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = this.password;
  next();
});

module.exports = mongoose.model("user", userSchema);
