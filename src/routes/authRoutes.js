const authController = require("../controllers/authController");
const express = require("express");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

const { signIn, signUp, logout, resetPassword, resetPasswordRequest } =
  authController;

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout/:id", auth, logout);

router.post("/reset-password", resetPasswordRequest);

router.put("/reset-password/:token", resetPassword);

module.exports = router;
